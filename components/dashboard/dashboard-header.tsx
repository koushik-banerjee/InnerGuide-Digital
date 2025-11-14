'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import NotificationCenter from '@/components/notifications/notification-center';

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mental Health Support</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {userName}</span>
          <NotificationCenter />
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
