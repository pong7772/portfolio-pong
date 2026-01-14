import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import Breakline from '@/common/components/elements/Breakline';
import { PPDList } from '@/modules/ppd';

const PAGE_TITLE = 'Personal and Professional Development';
const PAGE_DESCRIPTION =
  'Visothipong PPD Growth Portfolio - Select a coaching session';

const PersonalProfessionalDevelopment = () => {
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

        <div className='mx-auto max-w-4xl'>
          <div className='mt-12 grid gap-6 md:grid-cols-2'>
            {/* Session 1 Button */}
            <Link
              href='/pxl/personal-professional-development/session-1'
              className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800/60 dark:bg-neutral-900'
            >
              <div className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30'>
                    <svg
                      className='h-8 w-8 text-indigo-600 dark:text-indigo-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                </div>
                <h3 className='mb-2 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
                  Session 1
                </h3>
                <p className='mb-4 text-neutral-600 dark:text-neutral-400'>
                  Visothipong PPD Growth Portfolio
                </p>
                <p className='text-sm font-semibold text-indigo-600 dark:text-indigo-400'>
                  Roth Samnang Visothipong
                </p>
                <p className='mt-1 text-sm text-neutral-500 dark:text-neutral-500'>
                  Preparation for Coaching Session 1
                </p>
                <div className='mt-6 flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.72 7.72a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H8.25a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Session 2 Button */}
            <Link
              href='/pxl/personal-professional-development/session-2'
              className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800/60 dark:bg-neutral-900'
            >
              <div className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30'>
                    <svg
                      className='h-8 w-8 text-indigo-600 dark:text-indigo-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                </div>
                <h3 className='mb-2 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
                  Session 2
                </h3>
                <p className='mb-4 text-neutral-600 dark:text-neutral-400'>
                  PPD Growth Portfolio
                </p>
                <p className='text-sm font-semibold text-indigo-600 dark:text-indigo-400'>
                  Visothipong
                </p>
                <p className='mt-1 text-sm text-neutral-500 dark:text-neutral-500'>
                  Preparation for Coaching Session 2
                </p>
                <div className='mt-6 flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.72 7.72a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H8.25a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <Breakline className='my-12' />

        {/* PPD Posts Section */}
        <div>
          <h2 className='mb-6 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
            PPD Posts
          </h2>
          <PPDList />
        </div>
      </Container>
    </>
  );
};

export default PersonalProfessionalDevelopment;
