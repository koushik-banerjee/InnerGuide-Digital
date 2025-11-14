import { connectToDatabase } from '@/lib/mongodb';
import { ForumThread } from '@/models/ForumThread';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const thread = await ForumThread.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ thread }, { status: 200 });
  } catch (error) {
    console.error('Update views error:', error);
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 }
    );
  }
}
