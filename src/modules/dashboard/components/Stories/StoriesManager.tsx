import { useEffect, useState } from 'react';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import Image from '@/common/components/elements/Image';
import { Story } from '@/common/types/stories';
import { deleteStory, getStories } from '@/services/stories';

import StoryUploadForm from './StoryUploadForm';

const StoriesManager = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const data = await getStories();
      setStories(data);
    } catch (error) {
      toast.error('Failed to fetch stories');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      await deleteStory(id);
      toast.success('Story deleted successfully');
      fetchStories();
    } catch (error) {
      toast.error('Failed to delete story');
      console.error(error);
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    fetchStories();
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Manage Stories</h2>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          <BiPlus size={20} />
          <span>Add Story</span>
        </button>
      </div>

      {showUploadForm && (
        <StoryUploadForm
          onSuccess={handleUploadSuccess}
          onCancel={() => setShowUploadForm(false)}
        />
      )}

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500' />
        </div>
      ) : stories.length === 0 ? (
        <Card className='p-8 text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            No stories yet. Add your first story!
          </p>
        </Card>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {stories.map((story) => (
            <Card key={story.id} className='group relative overflow-hidden p-0'>
              <div className='relative aspect-video w-full'>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>{story.title}</h3>
                {story.description && (
                  <p className='mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400'>
                    {story.description}
                  </p>
                )}
                <div className='mt-2 flex items-center justify-between text-xs text-neutral-500'>
                  <span>Order: {story.order}</span>
                  <span className='text-xs text-neutral-400'>
                    {new Date(story.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(story.id)}
                className='absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100'
                title='Delete story'
              >
                <BiTrash size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoriesManager;
