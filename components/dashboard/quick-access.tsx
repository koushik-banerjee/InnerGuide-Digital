'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function QuickAccess() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/chat')}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-2">💬</div>
          <h3 className="font-bold mb-2">AI Chat</h3>
          <p className="text-sm text-gray-600 mb-4">24/7 AI support</p>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/resources')}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="font-bold mb-2">Resources</h3>
          <p className="text-sm text-gray-600 mb-4">Wellness content</p>
          <Button variant="outline" size="sm">
            Explore
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/forum')}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-2">👥</div>
          <h3 className="font-bold mb-2">Forum</h3>
          <p className="text-sm text-gray-600 mb-4">Peer support</p>
          <Button variant="outline" size="sm">
            Join
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard')}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-2">👨‍⚕️</div>
          <h3 className="font-bold mb-2">Counselor</h3>
          <p className="text-sm text-gray-600 mb-4">Book session</p>
          <Button variant="outline" size="sm">
            Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
