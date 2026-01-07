import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';

interface Tag {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  availableTags: Tag[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const CategoryFilter = ({
  availableTags,
  selectedTag,
  onTagSelect,
}: CategoryFilterProps) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      // Deselect if already selected
      onTagSelect(null);
      router.push(
        {
          pathname: '/blog',
          query: router.query.search ? { search: router.query.search } : {},
        },
        undefined,
        { shallow: true },
      );
    } else {
      // Select new tag
      onTagSelect(tag);
      router.push(
        {
          pathname: '/blog',
          query: {
            ...(router.query.search && { search: router.query.search }),
            tag,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  const handleClearFilter = () => {
    onTagSelect(null);
    router.push(
      {
        pathname: '/blog',
        query: router.query.search ? { search: router.query.search } : {},
      },
      undefined,
      { shallow: true },
    );
  };

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h5 className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
          Filter by Category
        </h5>
        {selectedTag && (
          <button
            onClick={handleClearFilter}
            className='flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
          >
            <HiX size={14} />
            Clear filter
          </button>
        )}
      </div>

      <div className='flex flex-wrap gap-2'>
        {availableTags.map((tag, index) => {
          const isSelected = selectedTag === tag.name;
          return (
            <motion.button
              key={tag.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => handleTagClick(tag.name)}
              className={clsx(
                'group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                isSelected
                  ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
              )}
            >
              <span className='relative z-10'>#{tag.name}</span>
              <span
                className={clsx(
                  'ml-2 rounded-full px-2 py-0.5 text-xs',
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400',
                )}
              >
                {tag.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
