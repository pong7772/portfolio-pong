import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';
import { useWindowSize } from 'usehooks-ts';

import useHasMounted from '@/common/hooks/useHasMounted';
import ChatButton from '@/modules/chat/components/ChatButton';

import HeaderSidebar from './header/HeaderSidebar';
import HeaderTop from './header/HeaderTop';
import NowPlayingBar from '../elements/NowPlayingBar';
import NowPlayingCard from '../elements/NowPlayingCard';

// import TopBar from '../elements/TopBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const { width } = useWindowSize();
  const isMobile = width < 480;

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system');

  const router = useRouter();
  const pageName = router.pathname.split('/')[1];

  const isFullPageHeader =
    pageName === 'playground' ||
    pageName === 'blog' ||
    router.pathname.startsWith('/blog/') ||
    router.pathname.startsWith('/learn/');

  const isShowChatButton = pageName !== 'guestbook';

  return (
    <>
      {/* <TopBar /> */}
      <div
        className={clsx(
          'mx-auto max-w-6xl',
          isDarkTheme ? 'dark:text-darkText' : '',
        )}
      >
        {isFullPageHeader ? (
          <div className='flex flex-col xl:pb-8'>
            <HeaderTop />
            <main className='transition-all duration-300'>{children}</main>
          </div>
        ) : (
          <div className='flex flex-col md:flex-row md:gap-3 md:py-4 lg:gap-4 xl:gap-6 xl:pb-8'>
            <HeaderSidebar />
            <main className='w-full max-w-full transition-all duration-300 md:w-4/5 md:max-w-[915px] lg:max-w-[915px] xl:max-w-[1000px]'>
              {children}
            </main>
          </div>
        )}
      </div>
      {isShowChatButton && <ChatButton />}
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  );
};

export default Layout;
