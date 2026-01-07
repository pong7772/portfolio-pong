import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';

interface PxlPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any;
}

const PAGE_TITLE = 'Hogeschool PXL';
const PAGE_DESCRIPTION =
  'My journey at Hogeschool PXL - Personal and Professional Development, International experiences, and Life in Belgium.';

const PxlPage: NextPage<PxlPageProps> = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Visothipong`}
        description={PAGE_DESCRIPTION}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

        <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {/* Personal and Professional Development */}
          <Link
            href='/pxl/personal-professional-development'
            className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900'
          >
            <div className='p-6'>
              <div className='mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                  <svg
                    className='h-6 w-6 text-blue-600 dark:text-blue-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
                Personal and Professional Development
              </h3>
              <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
                My journey of growth, learning, and skill development during my
                time at PXL.
              </p>
              <div className='mt-4 flex items-center justify-between'>
                <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                  Available
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5'
                  aria-hidden='true'
                >
                  <path d='M13.5 4.5a.75.75 0 0 0 0 1.5h4.69l-9.72 9.72a.75.75 0 1 0 1.06 1.06l9.72-9.72v4.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5Z' />
                </svg>
              </div>
            </div>
          </Link>

          {/* The Internationalist */}
          <Link
            href='/blog'
            className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900'
          >
            <div className='p-6'>
              <div className='mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30'>
                  <svg
                    className='h-6 w-6 text-purple-600 dark:text-purple-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
                The Internationalist
              </h3>
              <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
                Experiences and insights from an international perspective at
                PXL.
              </p>
              <div className='mt-4 flex items-center justify-between'>
                <span className='inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'>
                  Coming Soon
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5'
                  aria-hidden='true'
                >
                  <path d='M13.5 4.5a.75.75 0 0 0 0 1.5h4.69l-9.72 9.72a.75.75 0 1 0 1.06 1.06l9.72-9.72v4.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5Z' />
                </svg>
              </div>
            </div>
          </Link>

          {/* Life at Belgium */}
          <div className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900'>
            <div className='p-6'>
              <div className='mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30'>
                  <svg
                    className='h-6 w-6 text-red-600 dark:text-red-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
                Life at Belgium
              </h3>
              <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
                Stories and experiences about living and studying in Belgium.
              </p>
              <div className='mt-4'>
                <span className='inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'>
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            Content for these sections will be added soon. Stay tuned for
            updates!
          </p>
        </div>
      </Container>
    </>
  );
};

export default PxlPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 1,
  };
};
