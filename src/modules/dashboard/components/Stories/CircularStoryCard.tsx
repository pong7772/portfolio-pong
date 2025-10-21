import { motion } from 'framer-motion';
import { BiEdit, BiTrash } from 'react-icons/bi';

import Image from '@/common/components/elements/Image';
import { Story } from '@/common/types/stories';

interface CircularStoryCardProps {
  story: Story;
  onEdit?: (story: Story) => void;
  onDelete?: (id: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
}

const CircularStoryCard = ({
  story,
  onEdit,
  onDelete,
  size = 'md',
  showActions = true,
}: CircularStoryCardProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const iconSize = iconSizes[size];
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${sizeClass} cursor-pointer`}
    >
      {/* Main circular container with green border */}
      <div
        className={`relative ${sizeClass} overflow-hidden rounded-full border-4 border-green-500 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-neutral-800`}
      >
        {/* Image */}
        <div className='relative h-full w-full'>
          <Image
            src={story.image || '/images/placeholder.png'}
            alt={story.title}
            fill
            className='object-cover'
            unoptimized={story.image?.startsWith('data:')}
          />

          {/* Gradient overlay for better text visibility */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

          {/* Story title overlay */}
          <div className='absolute bottom-0 left-0 right-0 p-2'>
            <h4 className='truncate text-xs font-semibold text-white'>
              {story.title}
            </h4>
          </div>
        </div>
      </div>

      {/* Action buttons - only show on hover and when showActions is true */}
      {showActions && (
        <div className='absolute -right-1 -top-1 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {onEdit && (
            <button
              onClick={() => onEdit(story)}
              className='rounded-full bg-blue-500 p-1.5 text-white transition-colors hover:bg-blue-600'
              title='Edit story'
            >
              <BiEdit size={iconSize} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(story.id)}
              className='rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600'
              title='Delete story'
            >
              <BiTrash size={iconSize} />
            </button>
          )}
        </div>
      )}

      {/* Order indicator */}
      <div className='absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white'>
        {story.order}
      </div>

      {/* Visibility indicator */}
      {!story.is_show && (
        <div className='absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-white'>
          <span className='text-xs'>👁</span>
        </div>
      )}
    </motion.div>
  );
};

export default CircularStoryCard;
