'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CounselorList from '@/components/counselor/counselor-list';
import BookingForm from '@/components/counselor/booking-form';
import QuickAccess from '@/components/dashboard/quick-access';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
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
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mental Health Support</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <QuickAccess />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CounselorList />
          </div>

          <div className="space-y-6">
            {selectedCounselor && (
              <BookingForm
                counselorId={selectedCounselor}
                onBookingSuccess={() => fetchBookings(localStorage.getItem('token')!)}
              />
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Your Bookings</h3>
              {bookings.length > 0 ? (
                <ul className="space-y-3">
                  {bookings.map((booking: any) => (
                    <li key={booking._id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-semibold">{booking.counselorId?.userId?.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                      </p>
                      <p className="text-sm capitalize">
                        <span className="font-medium">Status:</span> {booking.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No bookings yet. Select a counselor to book your first session.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
