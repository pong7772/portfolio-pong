import { useEffect, useState } from 'react';

import useIsMobile from '@/common/hooks/useIsMobile';

import Breakline from '../../elements/Breakline';
import SearchBox from '../../elements/SearchBox';
import ThemeSwitcher from '../../elements/ThemeSwitcher';
import Navigation from '../../sidebar/Navigation';
import Profile from '../../sidebar/Profile';
import BackgroundAudioButton from '../../elements/BackgroundAudioButton';
import { useVisitorCount } from '@/common/hooks/useVisitorCount';

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
      // className='flex flex-col space-y-6 transition-all duration-300 lg:py-8'
      className='sticky top-0 z-10 flex flex-col space-y-6 transition-all duration-300 lg:py-6'
    >
      <Profile isScrolled={isScrolled} />
      {!isMobile && (
        <div className='space-y-3'>
          <div className='pb-1'>
            <SearchBox />
          </div>
          <Navigation />
          <Breakline className='mx-1' />
          <div className='space-y-2.5 px-1'>
            <div className='px-3'>
              <span className='text-sm text-neutral-600'>Theme</span>
            </div>
            <ThemeSwitcher />
            <div className='px-3 pt-2'>
              <div className='mb-2 text-xs text-neutral-600'>Visitors</div>
              <div className='flex items-center justify-between'>
                <div className='rounded-md border px-2 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300'>
                  {visitors.toLocaleString()}
                </div>
                <BackgroundAudioButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
