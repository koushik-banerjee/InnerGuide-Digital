'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  difficulty: string;
  duration?: number;
  views: number;
  onView?: (id: string) => void;
}

export default function ResourceCard({
  id,
  title,
  description,
  category,
  type,
  difficulty,
  duration,
  views,
  onView,
}: ResourceCardProps) {
  const categoryIcons: Record<string, string> = {
    video: '🎥',
    audio: '🎧',
    guide: '📖',
    article: '📝',
  };

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  const handleClick = () => {
    if (onView) {
      onView(id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-2xl">{categoryIcons[category] || '📄'}</span>
          <span className={`text-xs px-2 py-1 rounded ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{type.replace('-', ' ')}</span>
          {duration && <span>{duration} min</span>}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">{views.toLocaleString()} views</span>
        </div>

        <Button onClick={handleClick} size="sm" className="w-full">
          {category === 'video' ? 'Watch' : category === 'audio' ? 'Listen' : 'Read'}
        </Button>
      </CardContent>
    </Card>
  );
}
