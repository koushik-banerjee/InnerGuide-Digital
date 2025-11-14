import { connectToDatabase } from '@/lib/mongodb';
import { ForumThread } from '@/models/ForumThread';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    let query: any = { status: 'active' };
    if (category) query.category = category;

    const threads = await ForumThread.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ isPinned: -1, createdAt: -1 });

    const total = await ForumThread.countDocuments(query);

    return NextResponse.json(
      {
        threads,
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
    console.error('Fetch threads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch threads' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, content, category, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content required' },
        { status: 400 }
      );
    }

    const thread = new ForumThread({
      title,
      description,
      content,
      category,
      tags,
      authorId: decoded.userId,
      authorName: decoded.email,
    });

    await thread.save();

    return NextResponse.json({ thread }, { status: 201 });
  } catch (error) {
    console.error('Create thread error:', error);
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
}
