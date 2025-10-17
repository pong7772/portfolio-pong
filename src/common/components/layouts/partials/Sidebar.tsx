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
      className='sticky top-0 z-10 flex flex-col gap-4 rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/70 via-white/70 to-teal-50/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-teal-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/60 lg:gap-6 lg:p-5'
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
              <div className='mb-2 text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-300'>
                Visitors
              </div>
              <div className='flex items-center justify-between gap-2'>
                <div className='rounded-md border border-emerald-200 bg-white/70 px-2 py-1 text-xs text-emerald-800 shadow-sm dark:border-teal-700 dark:bg-neutral-800/70 dark:text-emerald-200'>
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
