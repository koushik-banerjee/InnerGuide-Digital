'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import CounselorList from '@/components/counselor/counselor-list';
import BookingForm from '@/components/counselor/booking-form';
import QuickAccess from '@/components/dashboard/quick-access';
import Link from 'next/link';

export default function Dashboard() {
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Your mental health support hub</p>
        </div>

        <QuickAccess />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">💬 AI Chat Support</CardTitle>
              <CardDescription>24/7 AI-guided coping strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📅 Book Counselor</CardTitle>
              <CardDescription>Schedule with professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/bookings">Book Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📚 Resources</CardTitle>
              <CardDescription>Wellness guides & content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/resources">Explore</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">👥 Peer Forum</CardTitle>
              <CardDescription>Community support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/forum">Join Forum</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📈 Analytics</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/analytics">View Stats</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">🔔 Notifications</CardTitle>
              <CardDescription>Your updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View All</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
