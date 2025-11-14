'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnalyticsData {
  avgMood: number;
  avgStress: number;
  totalSleep: number;
  totalExercise: number;
  daysTracked: number;
}

export default function UserAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);
  const [moodInput, setMoodInput] = useState(3);
  const [stressInput, setStressInput] = useState(3);
  const [sleepInput, setSleepInput] = useState(7);
  const [exerciseInput, setExerciseInput] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/analytics/user?days=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAnalytics(data.summary);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEntry = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/analytics/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          moodScore: moodInput,
          stressLevel: stressInput,
          sleepHours: sleepInput,
          exerciseMinutes: exerciseInput,
        }),
      });

      fetchAnalytics();
      alert('Daily entry saved successfully!');
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  const getMoodEmoji = (score: number) => {
    if (score <= 1) return '😢';
    if (score <= 2) return '😕';
    if (score <= 3) return '😐';
    if (score <= 4) return '🙂';
    return '😄';
  };

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Well-being Tracking</h2>
        <p className="text-gray-600 mb-6">
          Monitor your mental health journey with daily mood, stress, sleep, and exercise tracking.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Check-in</CardTitle>
            <CardDescription>Record your daily well-being metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mood: {getMoodEmoji(moodInput)} ({moodInput}/5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={moodInput}
                onChange={(e) => setMoodInput(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stress Level: {stressInput}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={stressInput}
                onChange={(e) => setStressInput(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="sleep" className="block text-sm font-medium mb-2">
                Sleep Hours
              </label>
              <input
                id="sleep"
                type="number"
                min="0"
                max="24"
                value={sleepInput}
                onChange={(e) => setSleepInput(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="exercise" className="block text-sm font-medium mb-2">
                Exercise (minutes)
              </label>
              <input
                id="exercise"
                type="number"
                min="0"
                value={exerciseInput}
                onChange={(e) => setExerciseInput(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button onClick={handleSaveEntry} className="w-full">
              Save Entry
            </Button>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary ({timeRange} days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Average Mood</span>
                <span className="text-2xl">{getMoodEmoji(Math.round(parseFloat(analytics?.avgMood || '0')))}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Avg Sleep</span>
                <span className="font-bold">{analytics?.totalSleep?.toFixed(1) || 0} hrs</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">Total Exercise</span>
                <span className="font-bold">{analytics?.totalExercise || 0} mins</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Days Tracked</span>
                <span className="font-bold">{analytics?.daysTracked || 0}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            {[7, 30, 90].map((days) => (
              <Button
                key={days}
                variant={timeRange === days ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(days)}
                className="flex-1"
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
