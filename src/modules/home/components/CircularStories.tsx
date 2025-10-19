import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import StoryModal from '@/common/components/elements/StoryModal';
import CircularStoryCard from '@/modules/dashboard/components/Stories/CircularStoryCard';
import { Story } from '@/common/types/stories';

interface CircularStoriesProps {
  stories: Story[];
}

const CircularStories = ({ stories }: CircularStoriesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto slideshow - change every 4 seconds
  useEffect(() => {
    if (isPaused || stories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, stories.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length,
    );
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  if (stories.length === 0) return null;

  return (
    <div className='mt-8'>
      <div className='mb-6'>
        <h3 className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
          Photo Stories
        </h3>
      </div>

      <div
        className='relative'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Circular Story Display */}
        <div className='relative flex justify-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className='cursor-pointer'
              onClick={() => handleStoryClick(stories[currentIndex])}
            >
              <CircularStoryCard
                story={stories[currentIndex]}
                size='lg'
                showActions={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {stories.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 dark:bg-neutral-800/20 dark:hover:bg-neutral-800/30'
                aria-label='Previous story'
              >
                <BiChevronLeft
                  size={24}
                  className='text-neutral-700 dark:text-neutral-300'
                />
              </button>
              <button
                onClick={goToNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 dark:bg-neutral-800/20 dark:hover:bg-neutral-800/30'
                aria-label='Next story'
              >
                <BiChevronRight
                  size={24}
                  className='text-neutral-700 dark:text-neutral-300'
                />
              </button>
            </>
          )}
        </div>

        {/* Story Info */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`info-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='mt-6 text-center'
          >
            <h4 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
              {stories[currentIndex].title}
            </h4>
            {stories[currentIndex].description && (
              <p className='mx-auto mt-2 max-w-md text-neutral-600 dark:text-neutral-400'>
                {stories[currentIndex].description}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        {stories.length > 1 && (
          <div className='mt-6 flex justify-center gap-2'>
            {stories.map((_, index) => (
              <div
                key={index}
                className='h-2 w-2 overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-600'
              >
                <motion.div
                  className='h-full bg-green-500'
                  initial={{ width: '0%' }}
                  animate={{
                    width: index === currentIndex ? '100%' : '0%',
                  }}
                  transition={{
                    duration: index === currentIndex && !isPaused ? 4 : 0,
                    ease: 'linear',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {stories.length > 1 && (
          <div className='mt-6 flex justify-center gap-3 overflow-x-auto pb-2'>
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 transition-all ${
                  index === currentIndex
                    ? 'scale-110 ring-2 ring-green-500'
                    : 'opacity-60 hover:scale-105 hover:opacity-100'
                }`}
              >
                <CircularStoryCard
                  story={story}
                  size='sm'
                  showActions={false}
                />
              </button>
            ))}
          </div>
        )}

        {/* Story Modal */}
        <StoryModal
          story={selectedStory}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CircularStories;
