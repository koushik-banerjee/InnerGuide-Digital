import { connectToDatabase } from '@/lib/mongodb';
import { Analytics } from '@/models/Analytics';
import { Booking } from '@/models/Booking';
import { User } from '@/models/User';
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
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCounselors = await User.countDocuments({ role: 'counselor' });
    const totalBookings = await Booking.countDocuments();
    const completedSessions = await Booking.countDocuments({ status: 'completed' });

    const analyticsData = await Analytics.aggregate([
      {
        $group: {
          _id: null,
          avgMood: { $avg: '$moodScore' },
          avgStress: { $avg: '$stressLevel' },
          avgSleep: { $avg: '$sleepHours' },
          avgExercise: { $avg: '$exerciseMinutes' },
          totalRecords: { $sum: 1 },
        },
      },
    ]);

    const bookingTrends = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]);

    return NextResponse.json(
      {
        stats: {
          totalUsers,
          totalStudents,
          totalCounselors,
          totalBookings,
          completedSessions,
        },
        wellbeing: analyticsData[0] || {},
        bookingTrends: bookingTrends.reverse(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin analytics' },
      { status: 500 }
    );
  }
}
