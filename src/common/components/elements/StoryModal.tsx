'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoClose as CloseIcon } from 'react-icons/io5';

import Image from './Image';
import { Story } from '@/common/types/stories';

interface StoryModalProps {
  story: Story | null;
  stories?: Story[]; // All stories for navigation
  currentStoryIndex?: number; // Current story index in the array
  isOpen: boolean;
  onClose: () => void;
  onStoryChange?: (index: number) => void; // Callback when story changes
}

const StoryModal = ({
  story,
  stories = [],
  currentStoryIndex = 0,
  isOpen,
  onClose,
  onStoryChange,
}: StoryModalProps) => {
  // Hooks must be called before any conditional returns
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images for current story (featured image + additional images)
  const getStoryImages = (storyItem: Story | null): string[] => {
    if (!storyItem) return [];
    const additionalImages = storyItem.images
      ? typeof storyItem.images === 'string'
        ? JSON.parse(storyItem.images)
        : storyItem.images
      : [];
    return storyItem.image ? [storyItem.image, ...additionalImages] : [];
  };

  const storyImages = getStoryImages(story);
  const hasMultipleImages = storyImages.length > 1;
  const hasMultipleStories = stories.length > 1;

  // Reset image index when story changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [story?.id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const goToNextImage = () => {
    if (currentImageIndex < storyImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (hasMultipleStories && onStoryChange) {
      // Move to next story
      const nextIndex = (currentStoryIndex + 1) % stories.length;
      onStoryChange(nextIndex);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (hasMultipleStories && onStoryChange) {
      // Move to previous story
      const prevIndex =
        (currentStoryIndex - 1 + stories.length) % stories.length;
      onStoryChange(prevIndex);
    }
  };

  const handleNext = () => {
    goToNextImage();
  };

  const handlePrevious = () => {
    goToPreviousImage();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextImage();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
    };
  }, [
    isOpen,
    onClose,
    currentImageIndex,
    storyImages.length,
    currentStoryIndex,
    stories.length,
    onStoryChange,
  ]);

  // Instagram-style click zones
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPosition = clickX / width;

    // Left half = previous, Right half = next
    if (clickPosition < 0.5) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
          >
            <div className='relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800'>
              {/* Close Button */}
              <button
                onClick={onClose}
                className='absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-neutral-800/90 dark:hover:bg-neutral-800'
                aria-label='Close modal'
              >
                <CloseIcon
                  size={20}
                  className='text-neutral-700 dark:text-neutral-300'
                />
              </button>

              {/* Image with Instagram-style navigation */}
              <div
                className='relative h-64 w-full cursor-pointer sm:h-80'
                onClick={handleImageClick}
              >
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={`${story.id}-${currentImageIndex}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className='relative h-full w-full'
                  >
                    <Image
                      src={storyImages[currentImageIndex] || story.image}
                      alt={`${story.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className='object-cover'
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Click zone indicators (optional, can be removed) */}
                <div className='absolute left-0 top-0 h-full w-1/2' />
                <div className='absolute right-0 top-0 h-full w-1/2' />

                {/* Navigation arrows (visible on hover) */}
                {(hasMultipleImages || hasMultipleStories) && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                      className='group absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity hover:bg-white/30 hover:opacity-100 dark:bg-neutral-800/20 dark:hover:bg-neutral-800/30'
                      aria-label='Previous'
                    >
                      <BiChevronLeft
                        size={24}
                        className='text-white dark:text-neutral-200'
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className='group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity hover:bg-white/30 hover:opacity-100 dark:bg-neutral-800/20 dark:hover:bg-neutral-800/30'
                      aria-label='Next'
                    >
                      <BiChevronRight
                        size={24}
                        className='text-white dark:text-neutral-200'
                      />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {hasMultipleImages && (
                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm'>
                    {currentImageIndex + 1} / {storyImages.length}
                  </div>
                )}

                {/* Progress bar for images */}
                {hasMultipleImages && storyImages.length > 1 && (
                  <div className='absolute left-0 right-0 top-0 flex gap-1 p-2'>
                    {storyImages.map((_, index) => (
                      <div
                        key={index}
                        className='h-1 flex-1 overflow-hidden rounded-full bg-white/20'
                      >
                        <motion.div
                          className='h-full bg-white'
                          initial={{ width: '0%' }}
                          animate={{
                            width: index === currentImageIndex ? '100%' : '0%',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='p-6'>
                <h2 className='mb-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {story.title}
                </h2>

                {story.description && (
                  <p className='mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300'>
                    {story.description}
                  </p>
                )}

                {story.link && (
                  <div className='mt-6'>
                    <a
                      href={story.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                    >
                      View Story
                      <svg
                        className='h-4 w-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Story Metadata */}
                <div className='mt-4 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400'>
                  <span>
                    Created: {new Date(story.created_at).toLocaleDateString()}
                  </span>
                  {story.updated_at !== story.created_at && (
                    <span>
                      Updated: {new Date(story.updated_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StoryModal;
