'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ResourceCard from './resource-card';

interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  difficulty: string;
  duration?: number;
  views: number;
}

const CATEGORIES = ['video', 'audio', 'guide', 'article'];
const TYPES = [
  'coping-strategy',
  'meditation',
  'sleep',
  'exercise',
  'nutrition',
  'stress-management',
  'anxiety',
  'depression',
  'relationships',
  'academic',
];

const LANGUAGES = ['en', 'es', 'fr', 'de', 'hi', 'zh'];

export default function ResourceHub() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchResources();
  }, [selectedCategory, selectedType, selectedLanguage, page]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        language: selectedLanguage,
        page: page.toString(),
      });

      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedType) params.append('type', selectedType);

      const response = await fetch(`/api/resources?${params}`);
      const data = await response.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceView = async (resourceId: string) => {
    try {
      await fetch(`/api/resources/${resourceId}/view`, { method: 'PUT' });
    } catch (error) {
      console.error('Failed to update view count:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-4">Wellness Resources</h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of videos, audio meditations, guides, and articles to support your mental health journey.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'en' && 'English'}
                {lang === 'es' && 'Español'}
                {lang === 'fr' && 'Français'}
                {lang === 'de' && 'Deutsch'}
                {lang === 'hi' && 'हिन्दी'}
                {lang === 'zh' && '中文'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
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

        <div>
          <label className="block text-sm font-medium mb-2">Content Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedType(selectedType === type ? null : type);
                  setPage(1);
                }}
              >
                {type.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading resources...</div>
      ) : resources.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                id={resource._id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                type={resource.type}
                difficulty={resource.difficulty}
                views={resource.views}
                onView={handleResourceView}
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
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          No resources found. Check back soon!
        </div>
      )}
    </div>
  );
}
