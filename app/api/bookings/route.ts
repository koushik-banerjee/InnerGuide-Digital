import { connectToDatabase } from '@/lib/mongodb';
import { Booking } from '@/models/Booking';
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

    const bookings = await Booking.find({ studentId: decoded.userId })
      .populate('counselorId')
      .populate('studentId', 'name email')
      .sort({ appointmentDate: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
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
    const { counselorId, appointmentDate, appointmentTime, notes } = body;

    if (!counselorId || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const booking = new Booking({
      studentId: decoded.userId,
      counselorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      notes,
      status: 'scheduled',
    });

    await booking.save();

    try {
      const { getIO } = await import('@/lib/socket');
      const io = getIO();
      io.to(`user:${counselorId}`).emit('notification:new', {
        type: 'booking',
        title: 'New Appointment Booking',
        message: `You have a new appointment booking for ${appointmentDate}`,
        data: { bookingId: booking._id, appointmentDate, appointmentTime },
      });
    } catch (error) {
      console.error('Socket.io error:', error);
    }

    return NextResponse.json(
      { booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
