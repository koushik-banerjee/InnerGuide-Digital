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
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Poppins' }}>
            Hello, {user.name} 👋
          </h1>
          <p className="text-muted-foreground">Your mental health support hub</p>
        </div>

        <QuickAccess />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">💬 AI Chat Support</CardTitle>
              <CardDescription>24/7 AI-guided coping strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/chat">Open Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📅 Book Counselor</CardTitle>
              <CardDescription>Schedule with professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/bookings">Book Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📚 Resources</CardTitle>
              <CardDescription>Wellness guides & content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">👥 Peer Forum</CardTitle>
              <CardDescription>Community support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/forum">Join Forum</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📈 Analytics</CardTitle>
              <CardDescription>Track your wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/analytics">View Stats</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">💚 Wellness Tracker</CardTitle>
              <CardDescription>Daily mood check-in</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                <Link href="/analytics">Log Today</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
