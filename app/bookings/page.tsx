'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookingsPage() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/');
      return;
    }

    setUser(JSON.parse(userData));
    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Counselor</h1>
          <p className="text-gray-600">Schedule a confidential session with our professional counselors</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Counselors</CardTitle>
                <CardDescription>Select a counselor to book your session</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Counselor list component</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-dashed">
              <CardContent className="pt-8 text-center">
                <p className="text-gray-500 mb-4">Select a counselor to see booking options</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.map((booking: any) => (
                      <div key={booking._id} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded">
                        <p className="font-semibold text-gray-900">{booking.counselorId?.userId?.name}</p>
                        <p className="text-sm text-gray-600">
                          📅 {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs font-medium capitalize">
                            {booking.status}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No bookings yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
