'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/auth/login-form';
import SignupForm from '@/components/auth/signup-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  if (isLoggedIn && user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
        <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <span className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins' }}>MindCare College</span>
              </Link>

              <div className="text-gray-900">
                Welcome, <span className="font-semibold">{user.name || user.email}</span>
              </div>

              <Button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setUser(null);
              }} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins' }}>
              Welcome back, {user.name || 'Student'}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access your mental health support tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/chat')}>
              <CardHeader>
                <div className="text-4xl mb-4">💬</div>
                <CardTitle>AI Chat Support</CardTitle>
                <CardDescription>24/7 instant help and coping strategies</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/bookings')}>
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle>Book Counselor</CardTitle>
                <CardDescription>Schedule with mental health professionals</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/resources')}>
              <CardHeader>
                <div className="text-4xl mb-4">📚</div>
                <CardTitle>Wellness Resources</CardTitle>
                <CardDescription>Videos, guides, and relaxation audio</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/forum')}>
              <CardHeader>
                <div className="text-4xl mb-4">👥</div>
                <CardTitle>Peer Support Forum</CardTitle>
                <CardDescription>Connect with other students</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/analytics')}>
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle>Analytics & Tracking</CardTitle>
                <CardDescription>Monitor your wellness journey</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push('/dashboard')}>
              <CardHeader>
                <div className="text-4xl mb-4">🏠</div>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View all your information</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
      <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins' }}>MindCare College</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Home</Link>
              <Link href="#resources" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Resources</Link>
              <Link href="#forum" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Peer Forum</Link>
              <Link href="#counselor" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Book Counselor</Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
              <Button onClick={() => setSignupOpen(true)}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins' }}>
              Your Mental Wellness Matters.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered support designed for college students.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600" onClick={() => router.push('/chat')}>
                Start AI Chat
              </Button>
              <Button size="lg" variant="outline" className="border-blue-200" onClick={() => router.push('/resources')}>
                Explore Resources
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl h-64 flex items-center justify-center text-white text-center p-8">
            <div className="text-4xl">AI Mental Health Support</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">💬</div>
              <CardTitle>AI Chat Support</CardTitle>
              <CardDescription>24/7 instant help and coping strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Get immediate support with evidence-based coping techniques.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">🔒</div>
              <CardTitle>Confidential Booking</CardTitle>
              <CardDescription>Meet a counselor securely</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Schedule appointments with trained mental health professionals.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">📚</div>
              <CardTitle>Wellness Resources</CardTitle>
              <CardDescription>Videos, guides, relaxation audio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Access wellness content in multiple languages.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins' }}>
            Trusted by Students Across Colleges
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-600">Students Felt Better</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">250+</div>
              <p className="text-gray-600">Counselor Sessions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10k+</div>
              <p className="text-gray-600">AI Conversations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">6</div>
              <p className="text-gray-600">Languages Supported</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins' }}>
              Ready to Take the First Step?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of college students using MindCare for mental health support.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Completely confidential and secure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">24/7 support available</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Professional counselors on campus</span>
              </li>
            </ul>
          </div>

          <Card className="border-0 shadow-2xl p-8">
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
              <Button size="lg" className="flex-1" onClick={() => setSignupOpen(true)}>
                Sign Up
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>MindCare</h3>
              <p className="text-gray-400 text-sm">Supporting student mental health.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><Link href="/forum" className="hover:text-white">Forum</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">Contact</Link></li>
                <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Social</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">Twitter</Link></li>
                <li><Link href="/" className="hover:text-white">Instagram</Link></li>
                <li><Link href="/" className="hover:text-white">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 MindCare College. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
          </DialogHeader>
          <LoginForm onSuccess={handleAuthSuccess} />
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => {
                setLoginOpen(false);
                setSignupOpen(true);
              }}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign up here
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          <SignupForm onSuccess={handleAuthSuccess} />
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => {
                setSignupOpen(false);
                setLoginOpen(true);
              }}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Log in here
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
