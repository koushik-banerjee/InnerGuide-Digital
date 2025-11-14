'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ThreadCardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  authorName: string;
  repliesCount: number;
  views: number;
  createdAt: string;
  isPinned: boolean;
  onClick?: (id: string) => void;
}

export default function ThreadCard({
  id,
  title,
  description,
  category,
  authorName,
  repliesCount,
  views,
  createdAt,
  isPinned,
  onClick,
}: ThreadCardProps) {
  const categoryColors: Record<string, string> = {
    anxiety: 'bg-purple-100 text-purple-800',
    depression: 'bg-blue-100 text-blue-800',
    stress: 'bg-red-100 text-red-800',
    relationships: 'bg-pink-100 text-pink-800',
    academic: 'bg-green-100 text-green-800',
    identity: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isPinned && <span className="text-lg">📌</span>}
              <span className={`text-xs px-2 py-1 rounded ${categoryColors[category]}`}>
                {category}
              </span>
            </div>
            <CardTitle className="line-clamp-2">{title}</CardTitle>
          </div>
        </div>
        {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">
          Posted by <span className="font-semibold">{authorName}</span>
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          <div className="flex gap-3">
            <span>💬 {repliesCount}</span>
            <span>👁️ {views}</span>
          </div>
        </div>

        <Button size="sm" className="w-full" variant="outline">
          View Discussion
        </Button>
      </CardContent>
    </Card>
  );
}
