'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSocket } from '@/lib/socket-client';

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    initializeSocket();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications?limit=10&unread=true', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeSocket = () => {
    const socket = getSocket();
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      socket.emit('user:join', userData.id);

      socket.on('notification:new', (notification) => {
        console.log('[v0] New notification received:', notification);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      socket.on('notification:thread', (notification) => {
        console.log('[v0] Thread notification received:', notification);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    }
  };

  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      try {
        const token = localStorage.getItem('token');
        await fetch(`/api/notifications/${notificationId}/read`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    },
    []
  );

  const notificationTypeIcons: Record<string, string> = {
    booking: '📅',
    forum_reply: '💬',
    counselor_update: '👥',
    message: '📨',
    system: '⚙️',
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 shadow-lg z-50">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>{unreadCount} unread</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <p className="text-sm text-gray-600">Loading...</p>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                    notif.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
                  }`}
                  onClick={() => handleMarkAsRead(notif._id)}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{notificationTypeIcons[notif.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-1">{notif.title}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600 text-center py-4">No notifications</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
