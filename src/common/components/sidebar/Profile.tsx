import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { MenuContext } from '@/common/context/MenuContext';
import useIsMobile from '@/common/hooks/useIsMobile';

import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';
import ProfileHeader from './ProfileHeader';
import SearchBox from '../elements/SearchBox';
import ThemeToggleButton from '../elements/ThemeToggleButton';
import BackgroundAudioButton from '../elements/BackgroundAudioButton';

interface ProfileProps {
  isScrolled?: boolean;
}

const Profile = ({ isScrolled = false }: ProfileProps) => {
  const isMobile = useIsMobile();

  const getImageSize = () => {
    let size = isMobile ? 20 : 56;
    if (!isMobile && isScrolled) {
      size = 40; // Maintain minimum size when scrolled
    }
    return size;
  };

  const [expandMenu, setExpandMenu] = useState<boolean>(false);

  const hideNavbar = () => {
    setExpandMenu(false);
  };

  useEffect(() => {
    if (expandMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandMenu]);

  return (
    <MenuContext.Provider value={{ hideNavbar }}>
      <div
        className={clsx(
          'fixed z-20 w-full bg-light p-2.5 shadow-sm dark:border-b dark:border-neutral-800 dark:bg-dark sm:p-3 md:relative md:border-none md:!bg-transparent md:p-0 md:shadow-none',
          expandMenu && 'pb-0',
        )}
      >
        <div className='flex items-center justify-between md:flex-col md:items-start md:space-y-3'>
          <ProfileHeader
            expandMenu={expandMenu}
            imageSize={getImageSize()}
            isScrolled={isScrolled}
          />

          {isMobile && (
            <div
              className={clsx(
                'flex items-center gap-1.5 sm:gap-2 md:hidden',
                expandMenu &&
                  'h-[70px] flex-col-reverse !items-end justify-between pb-1 sm:h-[80px]',
              )}
            >
              <BackgroundAudioButton />
              <ThemeToggleButton />
              <MobileMenuButton
                expandMenu={expandMenu}
                setExpandMenu={setExpandMenu}
              />
            </div>
          )}
        </div>

        {isMobile && (
          <AnimatePresence>
            {expandMenu && (
              <div className='space-y-2.5 pt-2.5 sm:space-y-3 sm:pt-3'>
                <SearchBox />
                <MobileMenu />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </MenuContext.Provider>
  );
};

export default Profile;
