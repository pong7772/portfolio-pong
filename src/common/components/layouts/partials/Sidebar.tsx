import { useEffect, useState } from 'react';

import { useVisitorCount } from '@/common/hooks/useVisitorCount';
import useIsMobile from '@/common/hooks/useIsMobile';

import BackgroundAudioButton from '../../elements/BackgroundAudioButton';
import Breakline from '../../elements/Breakline';
import SearchBox from '../../elements/SearchBox';
import ThemeSwitcher from '../../elements/ThemeSwitcher';
import Navigation from '../../sidebar/Navigation';
import Profile from '../../sidebar/Profile';

const Sidebar = () => {
  const visitors = useVisitorCount();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id='sidebar'
      className='sticky top-0 z-10 flex flex-col space-y-3 transition-all duration-300 sm:space-y-4 md:space-y-4 md:py-4 lg:space-y-5 lg:py-5 xl:space-y-6 xl:py-6'
    >
      <Profile isScrolled={isScrolled} />
      {!isMobile && (
        <div className='space-y-2 sm:space-y-3'>
          <div className='pb-1'>
            <SearchBox />
          </div>
          <Navigation />
          <Breakline className='mx-1' />
          <div className='space-y-2 px-1 sm:space-y-2.5'>
            <div className='px-2 sm:px-3'>
              <span className='text-[10px] text-neutral-600 dark:text-neutral-400 sm:text-xs md:text-sm'>
                Theme
              </span>
            </div>
            <ThemeSwitcher />
            <div className='px-2 pt-1 sm:px-3 sm:pt-2'>
              <div className='mb-1 text-[10px] text-neutral-600 dark:text-neutral-400 sm:mb-2 sm:text-xs'>
                Visitors
              </div>
              <div className='flex items-center justify-between gap-1 sm:gap-2'>
                <div className='rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-700 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:px-2 sm:py-1 sm:text-xs'>
                  {visitors.toLocaleString()}
                </div>
                <BackgroundAudioButton />
              </div>
            </div>
            <Breakline className='mx-1' />
            <div className='px-2 pt-2 sm:px-3 sm:pt-3'>
              <p className='text-[9px] leading-relaxed text-neutral-500 dark:text-neutral-500 sm:text-[10px]'>
                © {new Date().getFullYear()} Copyright
              </p>
              <p className='mt-1 text-[9px] leading-relaxed text-neutral-500 dark:text-neutral-500 sm:text-[10px]'>
                The whole website built by{' '}
                <span className='font-medium text-neutral-700 dark:text-neutral-300'>
                  Visothipong
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
