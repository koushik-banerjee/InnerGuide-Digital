import { connectToDatabase } from '@/lib/mongodb';
import { Resource } from '@/models/Resource';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const resource = await Resource.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ resource }, { status: 200 });
  } catch (error) {
    console.error('Update views error:', error);
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 }
    );
  }
}
