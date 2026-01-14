import { NextSeo } from 'next-seo';
import { useState } from 'react';
import useSWR from 'swr';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import { PPDPostItemProps } from '@/common/types/ppd';
import { fetcher } from '@/services/fetcher';

import SessionCard from '@/modules/ppd/components/SessionCard';
import PPDCard from '@/modules/ppd/components/PPDCard';
import { motion } from 'framer-motion';

const PAGE_TITLE = 'Personal and Professional Development';
const PAGE_DESCRIPTION =
  'Explore my journey of personal and professional development through coaching sessions, reflections, and growth experiences.';

const PersonalProfessionalDevelopment = () => {
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

  // Combine session cards with PPD posts
  const allCards = [
    {
      type: 'session',
      component: (
        <SessionCard
          key='session-1'
          title='Session 1'
          description='Visothipong PPD Growth Portfolio'
          author='Roth Samnang Visothipong'
          subtitle='Preparation for Coaching Session 1'
          href='/pxl/personal-professional-development/session-1'
        />
      ),
    },
    {
      type: 'session',
      component: (
        <SessionCard
          key='session-2'
          title='Session 2'
          description='PPD Growth Portfolio'
          author='Visothipong'
          subtitle='Preparation for Coaching Session 2'
          href='/pxl/personal-professional-development/session-2'
        />
      ),
    },
    ...posts.map((post: PPDPostItemProps) => ({
      type: 'post',
      component: (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PPDCard {...post} />
        </motion.div>
      ),
    })),
  ];

  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Visothipong`}
        description={PAGE_DESCRIPTION}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/pxl/personal-professional-development`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/pxl/personal-professional-development`,
          title: `${PAGE_TITLE} - Visothipong`,
          description: PAGE_DESCRIPTION,
          type: 'website',
          siteName: 'Visothipong Portfolio',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'Personal and Professional Development, PPD, PXL, Hogeschool PXL, Coaching Session, Visothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, Professional Growth, Belgium, Master of Education',
          },
        ]}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

        <div className='space-y-6'>
          {totalPosts > 0 && (
            <div className='text-center'>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                Showing {allCards.length} items
              </p>
            </div>
          )}

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
            {!isValidating ? (
              <>
                {allCards.map((item, index) => (
                  <div key={index}>{item.component}</div>
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

          {!isValidating && allCards.length === 0 && (
            <EmptyState message='There are no items available at the moment.' />
          )}
        </div>
      </Container>
    </>
  );
};

export default PersonalProfessionalDevelopment;
