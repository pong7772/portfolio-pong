import { useEffect, useState } from 'react';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import { Story } from '@/common/types/stories';
import { deleteStory, getStories } from '@/services/stories';

import CircularStoryCard from './CircularStoryCard';
import EnhancedStoryUploadForm from './EnhancedStoryUploadForm';

const StoriesManager = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      // Fetch all stories (including hidden ones) for dashboard
      const data = await getStories(true);
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
    setEditingStory(null);
    fetchStories();
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setShowUploadForm(true);
  };

  const handleCancel = () => {
    setShowUploadForm(false);
    setEditingStory(null);
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
        <EnhancedStoryUploadForm
          story={editingStory || undefined}
          onSuccess={handleUploadSuccess}
          onCancel={handleCancel}
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
        <div className='space-y-6'>
          {/* Stories Grid with Circular Cards */}
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {stories.map((story) => (
              <div
                key={story.id}
                className='flex flex-col items-center space-y-2'
              >
                <CircularStoryCard
                  story={story}
                  onDelete={handleDelete}
                  onEdit={() => handleEdit(story)}
                  size='md'
                  showActions={true}
                />
                <div className='text-center'>
                  <h4 className='max-w-32 truncate text-sm font-medium text-neutral-800 dark:text-neutral-200'>
                    {story.title}
                  </h4>
                  <p className='text-xs text-neutral-500'>
                    {new Date(story.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative: Compact List View */}
          <div className='mt-8'>
            <h4 className='mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200'>
              Story Details
            </h4>
            <div className='space-y-3'>
              {stories.map((story) => (
                <Card key={`detail-${story.id}`} className='p-4'>
                  <div className='flex items-center gap-4'>
                    <CircularStoryCard
                      story={story}
                      size='sm'
                      showActions={false}
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <h5 className='font-semibold text-neutral-800 dark:text-neutral-200'>
                          {story.title}
                        </h5>
                        {!story.is_show && (
                          <span className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400'>
                            Hidden
                          </span>
                        )}
                      </div>
                      {story.description && (
                        <p className='mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400'>
                          {story.description}
                        </p>
                      )}
                      <div className='mt-2 flex items-center gap-4 text-xs text-neutral-500'>
                        <span>Order: {story.order}</span>
                        <span>
                          Created:{' '}
                          {new Date(story.created_at).toLocaleDateString()}
                        </span>
                        {story.link && (
                          <span className='text-blue-600 dark:text-blue-400'>
                            Has custom link
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleEdit(story)}
                        className='rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600'
                        title='Edit story'
                      >
                        <BiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        className='rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600'
                        title='Delete story'
                      >
                        <BiTrash size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesManager;
