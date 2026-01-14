import { useState } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';

import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import { PPDPostItemProps } from '@/common/types/ppd';
import { fetcher } from '@/services/fetcher';

import PPDCard from './PPDCard';

const PPDList = () => {
  const [page, setPage] = useState<number>(1);
  const perPage = 12;

  const { data, isValidating } = useSWR(
    `/api/ppd-posts?page=${page}&per_page=${perPage}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    },
  );

  const posts: PPDPostItemProps[] = data?.data?.posts || [];
  const totalPages = data?.data?.total_pages || 0;
  const totalPosts = data?.data?.total_posts || 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderEmptyState = () => {
    if (!isValidating && posts.length === 0) {
      return (
        <EmptyState message='There are no personal and professional development posts available at the moment.' />
      );
    }
    return null;
  };

  return (
    <div className='space-y-8'>
      <div className='space-y-6'>
        {totalPosts > 0 && (
          <div className='text-center'>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              Showing {posts.length} of {totalPosts} posts
            </p>
          </div>
        )}

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {!isValidating ? (
            <>
              {posts.map((post: PPDPostItemProps, index: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PPDCard {...post} />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {new Array(3).fill(0).map((_, index) => (
                <div
                  key={index}
                  className='h-[400px] animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800'
                />
              ))}
            </>
          )}
        </div>

        {!isValidating && data?.status && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        {renderEmptyState()}
      </div>
    </div>
  );
};

export default PPDList;
