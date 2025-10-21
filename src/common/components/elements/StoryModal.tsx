'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { IoClose as CloseIcon } from 'react-icons/io5';

import Image from './Image';
import { Story } from '@/common/types/stories';

interface StoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal = ({ story, isOpen, onClose }: StoryModalProps) => {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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

              {/* Image */}
              <div className='relative h-64 w-full sm:h-80'>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className='object-cover'
                  quality={100}
                  priority
                />
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
