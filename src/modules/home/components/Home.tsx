import dynamic from 'next/dynamic';
import { memo } from 'react';

import Breakline from '@/common/components/elements/Breakline';
import { Story } from '@/common/types/stories';

import Introduction from './Introduction';

// Lazy load heavy components below the fold
const BlogPreview = dynamic(() => import('./BlogPreview'), {
  loading: () => (
    <div className='h-64 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800' />
  ),
});

const BioPoem = dynamic(() => import('./BioPoem'), {
  loading: () => (
    <div className='h-32 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800' />
  ),
});

const SkillsSection = dynamic(() => import('./SkillsSection'), {
  loading: () => (
    <div className='h-96 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800' />
  ),
});

const Services = dynamic(() => import('./Services'), {
  loading: () => (
    <div className='h-48 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800' />
  ),
});

interface HomeProps {
  stories?: Story[];
}

const Home = memo(({ stories = [] }: HomeProps) => {
  return (
    <>
      <Introduction stories={stories} />
      <Breakline className='mb-7 mt-8' />
      <BlogPreview />
      <Breakline className='my-8' />
      <BioPoem />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
    </>
  );
});

Home.displayName = 'Home';

export default Home;
