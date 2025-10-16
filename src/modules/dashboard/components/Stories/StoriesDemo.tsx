import { CircularStoryCard, EnhancedStoryUploadForm } from './index';

/**
 * Demo component showing how to use the new circular story components
 * This can be used for testing or as an example implementation
 */
const StoriesDemo = () => {
  const handleStoryEdit = (story: any) => {
    console.log('Edit story:', story);
  };

  const handleStoryDelete = (id: number) => {
    console.log('Delete story:', id);
  };

  const handleUploadSuccess = () => {
    console.log('Upload successful');
  };

  const handleUploadCancel = () => {
    console.log('Upload cancelled');
  };

  // Mock story data for demo
  const mockStory = {
    id: 1,
    title: 'Sample Story',
    description: 'This is a sample story description',
    image: '/images/placeholder.png',
    link: '',
    order: 1,
    is_show: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  return (
    <div className='space-y-8 p-6'>
      <h2 className='text-2xl font-bold'>Circular Stories Demo</h2>

      {/* Circular Story Card Demo */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Circular Story Cards</h3>
        <div className='flex items-center gap-6'>
          <CircularStoryCard
            story={mockStory}
            size='sm'
            showActions={true}
            onEdit={handleStoryEdit}
            onDelete={handleStoryDelete}
          />
          <CircularStoryCard
            story={mockStory}
            size='md'
            showActions={true}
            onEdit={handleStoryEdit}
            onDelete={handleStoryDelete}
          />
          <CircularStoryCard
            story={mockStory}
            size='lg'
            showActions={true}
            onEdit={handleStoryEdit}
            onDelete={handleStoryDelete}
          />
        </div>
      </div>

      {/* Enhanced Upload Form Demo */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Enhanced Upload Form</h3>
        <EnhancedStoryUploadForm
          onSuccess={handleUploadSuccess}
          onCancel={handleUploadCancel}
        />
      </div>
    </div>
  );
};

export default StoriesDemo;
