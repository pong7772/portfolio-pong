import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import Image from '@/common/components/elements/Image';
import { Story } from '@/common/types/stories';

interface StoriesProps {
  stories: Story[];
}

const Stories = ({ stories }: StoriesProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slideshow - change every 5 seconds
  useEffect(() => {
    if (isPaused || stories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000);

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
    // Use custom link if provided, otherwise go to story detail page
    if (story.link) {
      router.push(story.link);
    } else {
      router.push(`/stories/${story.id}`);
    }
  };

  if (stories.length === 0) return null;

  return (
    <div className='mt-8'>
      <div className='mb-4'>
        <h3 className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
          Photo Stories
        </h3>
      </div>

      <div
        className='relative'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Story Display */}
        <div className='relative h-[400px] w-full overflow-hidden rounded-xl md:h-[500px]'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className='relative h-full w-full cursor-pointer'
              onClick={() => handleStoryClick(stories[currentIndex])}
            >
              <Image
                src={stories[currentIndex].image}
                alt={stories[currentIndex].title}
                fill
                className='object-cover'
                priority
              />
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

              {/* Story info */}
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h4 className='text-2xl font-bold'>
                  {stories[currentIndex].title}
                </h4>
                {stories[currentIndex].description && (
                  <p className='mt-2 text-neutral-200'>
                    {stories[currentIndex].description}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {stories.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30'
                aria-label='Previous story'
              >
                <BiChevronLeft size={24} className='text-white' />
              </button>
              <button
                onClick={goToNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30'
                aria-label='Next story'
              >
                <BiChevronRight size={24} className='text-white' />
              </button>
            </>
          )}

          {/* Progress indicators */}
          <div className='absolute left-0 right-0 top-4 flex gap-1 px-4'>
            {stories.map((_, index) => (
              <div
                key={index}
                className='h-1 flex-1 overflow-hidden rounded-full bg-white/30'
              >
                <motion.div
                  className='h-full bg-white'
                  initial={{ width: '0%' }}
                  animate={{
                    width: index === currentIndex ? '100%' : '0%',
                  }}
                  transition={{
                    duration: index === currentIndex && !isPaused ? 5 : 0,
                    ease: 'linear',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        {stories.length > 1 && (
          <div className='mt-4 flex gap-2 overflow-x-auto pb-2'>
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-blue-500'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
