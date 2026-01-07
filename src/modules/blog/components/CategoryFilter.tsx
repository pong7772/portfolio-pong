import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiX } from 'react-icons/hi';

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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className='rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-2 text-sm font-semibold text-neutral-800 transition-colors hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100'
          >
            <span>Filter by Tags</span>
            {isExpanded ? (
              <HiChevronUp
                size={18}
                className='text-neutral-600 dark:text-neutral-400'
              />
            ) : (
              <HiChevronDown
                size={18}
                className='text-neutral-600 dark:text-neutral-400'
              />
            )}
          </button>
          {selectedTag && (
            <span className='rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
              Active: #{selectedTag}
            </span>
          )}
        </div>
        {selectedTag && (
          <button
            onClick={handleClearFilter}
            className='flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          >
            <HiX size={14} />
            Clear
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden'
          >
            <div className='border-t border-neutral-200 p-4 pt-4 dark:border-neutral-800'>
              <div className='flex flex-wrap gap-2.5'>
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
                        'group relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105',
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
                      )}
                    >
                      <span className='relative z-10 font-semibold'>
                        #{tag.name}
                      </span>
                      <span
                        className={clsx(
                          'rounded-full px-2.5 py-0.5 text-xs font-bold',
                          isSelected
                            ? 'bg-white/25 text-white'
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryFilter;
