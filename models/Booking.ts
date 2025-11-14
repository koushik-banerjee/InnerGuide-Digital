import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  studentId: string;
  counselorId: string;
  appointmentDate: Date;
  appointmentTime: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  meetingLink?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    counselorId: {
      type: Schema.Types.ObjectId,
      ref: 'Counselor',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    duration: { type: Number, default: 60 },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    notes: String,
    meetingLink: String,
    cancellationReason: String,
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
