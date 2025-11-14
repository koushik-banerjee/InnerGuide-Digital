'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/chat/chat-interface';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mental Health Support</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <ChatInterface />
      </div>
    </main>
  );
}
