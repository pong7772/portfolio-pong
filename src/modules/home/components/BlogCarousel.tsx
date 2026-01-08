import { motion } from 'framer-motion';
import { memo, useMemo, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import useSWR from 'swr';

import BlogCardNewSkeleton from '@/common/components/skeleton/BlogCardNewSkeleton';
import { BlogItemProps } from '@/common/types/blog';
import BlogCardNew from '@/modules/blog/components/BlogCardNew';
import { fetcher } from '@/services/fetcher';

const BlogCarousel = memo(() => {
  const { data, isLoading } = useSWR(`/api/blog?page=1&per_page=15`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
    dedupingInterval: 60000, // Cache for 60 seconds
  });

  const blogData: BlogItemProps[] = useMemo(() => {
    return data?.data?.posts || [];
  }, [data]);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const renderBlogCards = () => {
    if (isLoading) {
      return Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className='w-[280px] flex-shrink-0 sm:w-[300px] md:w-[320px]'
        >
          <BlogCardNewSkeleton />
        </div>
      ));
    }

    return blogData.map((item, index) => (
      <motion.div
        key={item.id || index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className='w-[280px] flex-shrink-0 sm:w-[300px] md:w-[320px]'
      >
        <BlogCardNew {...item} />
      </motion.div>
    ));
  };

  return (
    <div
      className='flex gap-3 overflow-x-auto px-4 py-4 scrollbar-hide sm:gap-4 sm:px-0 md:gap-5'
      {...events}
      ref={ref}
    >
      {renderBlogCards()}
    </div>
  );
});

BlogCarousel.displayName = 'BlogCarousel';

export default BlogCarousel;
