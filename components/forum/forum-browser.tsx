'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThreadCard from './thread-card';

interface Thread {
  _id: string;
  title: string;
  description?: string;
  category: string;
  authorName: string;
  replies: any[];
  views: number;
  createdAt: string;
  isPinned: boolean;
}

const CATEGORIES = ['anxiety', 'depression', 'stress', 'relationships', 'academic', 'identity', 'other'];

export default function ForumBrowser() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [page, setPage] = useState(1);
  const [replyContent, setReplyContent] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, [selectedCategory, page]);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString() });
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/forum/threads?${params}`);
      const data = await response.json();
      setThreads(data.threads);
    } catch (error) {
      console.error('Failed to fetch threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThreadClick = async (thread: Thread) => {
    setSelectedThread(thread);
    try {
      await fetch(`/api/forum/threads/${thread._id}/view`, { method: 'PUT' });
    } catch (error) {
      console.error('Failed to update views:', error);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThread || !replyContent.trim()) return;

    setReplyLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/forum/threads/${selectedThread._id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedThread(data.thread);
        setReplyContent('');
      }
    } catch (error) {
      console.error('Failed to add reply:', error);
    } finally {
      setReplyLoading(false);
    }
  };

  if (selectedThread) {
    return (
      <div className="space-y-6">
        <Button onClick={() => setSelectedThread(null)} variant="outline">
          ← Back to Threads
        </Button>

        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {selectedThread.category}
                </span>
              </div>
              <CardTitle className="text-2xl">{selectedThread.title}</CardTitle>
              <CardDescription>
                Started by <span className="font-semibold">{selectedThread.authorName}</span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{selectedThread.description}</p>

            <div className="border-t pt-4">
              <h3 className="font-bold mb-4">Replies ({selectedThread.replies.length})</h3>
              <div className="space-y-4">
                {selectedThread.replies.map((reply, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.authorName}</span>
                        {reply.isVolunteer && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Volunteer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold mb-3">Add Your Reply</h3>
              <form onSubmit={handleReply} className="space-y-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Share your thoughts or support..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                />
                <Button type="submit" disabled={replyLoading || !replyContent.trim()}>
                  {replyLoading ? 'Posting...' : 'Post Reply'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-4">Peer Support Forum</h2>
        <p className="text-gray-600 mb-6">
          Connect with other students, share experiences, and find support from trained peer volunteers.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Filter by Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory(selectedCategory === category ? null : category);
                setPage(1);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading discussions...</div>
      ) : threads.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                title={thread.title}
                description={thread.description}
                category={thread.category}
                authorName={thread.authorName}
                repliesCount={thread.replies.length}
                views={thread.views}
                createdAt={thread.createdAt}
                isPinned={thread.isPinned}
                onClick={handleThreadClick}
              />
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">Page {page}</span>
            <Button variant="outline" onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          No discussions yet. Be the first to start a conversation!
        </div>
      )}
    </div>
  );
}
