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
    <aside
      id='sidebar'
      className='sticky top-0 z-10 flex flex-col gap-4 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-neutral-800/70 dark:bg-neutral-900/40 lg:gap-6 lg:p-5'
    >
      <Profile isScrolled={isScrolled} />

      {/* Desktop content */}
      {!isMobile && (
        <div className='flex flex-col gap-4'>
          <div className='pb-1'>
            <SearchBox />
          </div>
          <Navigation />
          <Breakline className='mx-1' />
          <div className='space-y-3'>
            <div className='px-1'>
              <span className='text-xs uppercase tracking-widest text-neutral-500'>
                Preferences
              </span>
            </div>
            <div className='px-1'>
              <ThemeSwitcher />
            </div>
            <div className='px-1'>
              <div className='mb-2 text-xs text-neutral-600 dark:text-neutral-400'>
                Visitors
              </div>
              <div className='flex items-center justify-between gap-2'>
                <div className='rounded-md border px-2 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300'>
                  {visitors.toLocaleString()}
                </div>
                <BackgroundAudioButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile enhancements: allow scroll for tall menus */}
      {isMobile && (
        <div className='-mx-2 max-h-[50vh] overflow-y-auto px-2 pb-2'>
          <Navigation />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
