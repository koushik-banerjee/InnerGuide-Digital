'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Mental Health Support</h1>
          <p className="text-xl text-gray-600 mb-8">
            Confidential counseling and peer support for college students
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Services</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">AI-Guided Support</h3>
                  <p className="text-gray-600 text-sm">24/7 coping strategies and guidance</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Counselor Booking</h3>
                  <p className="text-gray-600 text-sm">Schedule confidential sessions</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Resource Hub</h3>
                  <p className="text-gray-600 text-sm">Wellness content in multiple languages</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Peer Support</h3>
                  <p className="text-gray-600 text-sm">Community forum with trained volunteers</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <LoginForm />
            <div className="text-center">
              <p className="text-gray-600 mb-4">Don't have an account?</p>
              <Button
                onClick={() => router.push('/register')}
                variant="outline"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
