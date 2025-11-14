'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/auth/signup-form';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      router.push('/dashboard');
    }
  }, [router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Join Our Community</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create your account to access confidential mental health support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why Join Us?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Confidential Support</h3>
                  <p className="text-gray-600 text-sm">Your privacy is our priority</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">24/7 AI Assistant</h3>
                  <p className="text-gray-600 text-sm">Instant support whenever you need it</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Professional Counselors</h3>
                  <p className="text-gray-600 text-sm">Expert guidance from licensed professionals</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h3 className="font-semibold">Peer Community</h3>
                  <p className="text-gray-600 text-sm">Connect with other students</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <SignupForm />
            <div className="text-center">
              <p className="text-gray-600 mb-4">Already have an account?</p>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
