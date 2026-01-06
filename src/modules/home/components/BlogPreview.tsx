import Link from 'next/link';
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs';

import SectionHeading from '@/common/components/elements/SectionHeading';
import SectionSubHeading from '@/common/components/elements/SectionSubHeading';

import BlogCarousel from './BlogCarousel';

const BlogPreview = () => {
  return (
    <section className='w-full space-y-4 sm:space-y-5 md:space-y-6'>
      <div className='flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4'>
        <SectionHeading title='Latest Articles' className='ml-0 sm:ml-1' />
        <SectionSubHeading>
          <Link href='/blog'>
            <div className='mt-0 flex cursor-pointer items-center gap-1 text-xs text-neutral-700 transition-all duration-300 hover:gap-2 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300 sm:mt-1 sm:text-sm'>
              <div className='flex items-center'>
                View All <span className='ml-1 hidden sm:inline'>Articles</span>
              </div>
              <ViewAllIcon size={18} className='sm:h-5 sm:w-5' />
            </div>
          </Link>
        </SectionSubHeading>
      </div>
      <div className='w-full overflow-hidden'>
        <BlogCarousel />
      </div>
    </section>
  );
};

export default BlogPreview;
