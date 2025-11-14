'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingFormProps {
  counselorId: string;
  onBookingSuccess?: () => void;
}

export default function BookingForm({ counselorId, onBookingSuccess }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          counselorId,
          appointmentDate: date,
          appointmentTime: time,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Booking failed');
        return;
      }

      setSuccess(true);
      setDate('');
      setTime('');
      setNotes('');

      if (onBookingSuccess) {
        onBookingSuccess();
      }

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book an Appointment</CardTitle>
        <CardDescription>Schedule a session with this counselor</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>}
          {success && (
            <div className="p-3 bg-green-50 text-green-700 rounded text-sm">
              Booking confirmed! You will receive a confirmation email.
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Preferred Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">
              Preferred Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell the counselor about your concerns..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
