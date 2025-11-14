'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Counselor {
  _id: string;
  userId: {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
  };
  specializations: string[];
  rating: number;
  totalSessions: number;
  consultationDuration: number;
  availableDays: string[];
}

interface CounselorListProps {
  onSelectCounselor?: (id: string) => void;
  selectedId?: string | null;
}

export default function CounselorList({ onSelectCounselor, selectedId }: CounselorListProps) {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await fetch('/api/counselors');
        const data = await response.json();
        setCounselors(data.counselors);
      } catch (error) {
        console.error('Failed to fetch counselors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading counselors...</div>;
  }

  return (
    <div className="grid gap-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Available Counselors</h2>
        <p className="text-gray-600">Select a counselor to book an appointment</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {counselors.map((counselor) => (
          <Card key={counselor._id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{counselor.userId.name}</CardTitle>
              <CardDescription>{counselor.userId.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {counselor.userId.bio && (
                <p className="text-sm text-gray-600">{counselor.userId.bio}</p>
              )}

              {counselor.specializations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-2">
                    {counselor.specializations.map((spec) => (
                      <span key={spec} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Rating</p>
                  <p className="font-semibold">{'⭐'.repeat(Math.round(counselor.rating))}</p>
                </div>
                <div>
                  <p className="text-gray-600">Sessions</p>
                  <p className="font-semibold">{counselor.totalSessions}</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedCounselor(counselor._id);
                  onSelectCounselor?.(counselor._id);
                }}
                className="w-full"
                variant={selectedId !== undefined ? (selectedId === counselor._id ? 'default' : 'outline') : (selectedCounselor === counselor._id ? 'default' : 'outline')}
              >
                {selectedId !== undefined ? (selectedId === counselor._id ? 'Selected' : 'Book Session') : (selectedCounselor === counselor._id ? 'Selected' : 'Book Session')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {counselors.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No counselors available. Please check back later.
        </div>
      )}
    </div>
  );
}
