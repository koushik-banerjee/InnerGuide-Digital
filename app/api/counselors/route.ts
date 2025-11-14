import { connectToDatabase } from '@/lib/mongodb';
import { Counselor } from '@/models/Counselor';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');

    let query = {};
    if (specialization) {
      query = { specializations: specialization };
    }

    const counselors = await Counselor.find(query)
      .populate('userId', 'name email phone bio')
      .lean();

    return NextResponse.json({ counselors }, { status: 200 });
  } catch (error) {
    console.error('Fetch counselors error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counselors' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { userId, specializations, availableDays, availableHours, consultationDuration } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const counselor = new Counselor({
      userId,
      specializations,
      availableDays,
      availableHours,
      consultationDuration,
    });

    await counselor.save();

    return NextResponse.json(
      { counselor },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create counselor error:', error);
    return NextResponse.json(
      { error: 'Failed to create counselor profile' },
      { status: 500 }
    );
  }
}
