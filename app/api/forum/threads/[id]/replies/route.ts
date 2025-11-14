import { connectToDatabase } from '@/lib/mongodb';
import { ForumThread } from '@/models/ForumThread';
import { Volunteer } from '@/models/Volunteer';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
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
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content required' },
        { status: 400 }
      );
    }

    const volunteer = await Volunteer.findOne({ userId: decoded.userId });
    const isVolunteer = volunteer && volunteer.status === 'active';

    const thread = await ForumThread.findByIdAndUpdate(
      params.id,
      {
        $push: {
          replies: {
            authorId: decoded.userId,
            authorName: decoded.email,
            content,
            isVolunteer,
          },
        },
      },
      { new: true }
    );

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    if (isVolunteer) {
      await Volunteer.findByIdAndUpdate(
        volunteer._id,
        { $inc: { repliesCount: 1 } }
      );
    }

    return NextResponse.json({ thread }, { status: 201 });
  } catch (error) {
    console.error('Add reply error:', error);
    return NextResponse.json(
      { error: 'Failed to add reply' },
      { status: 500 }
    );
  }
}
