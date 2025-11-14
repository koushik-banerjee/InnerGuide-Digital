import { connectToDatabase } from '@/lib/mongodb';
import { Analytics } from '@/models/Analytics';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await Analytics.find({
      userId: decoded.userId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1 });

    const avgMood = data.length > 0 
      ? (data.reduce((sum, d) => sum + (d.moodScore || 0), 0) / data.length).toFixed(1)
      : 0;
    const avgStress = data.length > 0
      ? (data.reduce((sum, d) => sum + (d.stressLevel || 0), 0) / data.length).toFixed(1)
      : 0;
    const totalSleep = data.reduce((sum, d) => sum + (d.sleepHours || 0), 0);
    const totalExercise = data.reduce((sum, d) => sum + (d.exerciseMinutes || 0), 0);

    return NextResponse.json(
      {
        data,
        summary: {
          avgMood,
          avgStress,
          totalSleep,
          totalExercise,
          daysTracked: data.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analytics = await Analytics.findOneAndUpdate(
      { userId: decoded.userId, date: today },
      { ...body, userId: decoded.userId, date: today },
      { new: true, upsert: true }
    );

    return NextResponse.json({ analytics }, { status: 201 });
  } catch (error) {
    console.error('Create analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to save analytics' },
      { status: 500 }
    );
  }
}
