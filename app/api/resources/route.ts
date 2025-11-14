import { connectToDatabase } from '@/lib/mongodb';
import { Resource } from '@/models/Resource';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const language = searchParams.get('language') || 'en';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;

    let query: any = {};

    if (type) query.type = type;
    if (category) query.category = category;
    query.languages = language;

    const resources = await Resource.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ views: -1, createdAt: -1 });

    const total = await Resource.countDocuments(query);

    return NextResponse.json(
      {
        resources,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch resources error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const resource = new Resource(body);
    await resource.save();

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}
