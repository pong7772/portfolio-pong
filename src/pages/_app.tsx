import AOS from 'aos';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

import 'tailwindcss/tailwind.css';
import 'aos/dist/aos.css';
import '@/common/styles/globals.css';

import CommandPalette from '@/common/components/elements/CommandPalette';
import Layout from '@/common/components/layouts';
import { CommandPaletteProvider } from '@/common/context/CommandPaletteContext';
import { MusicProvider, useMusic } from '@/common/context/MusicContext';
import { initFirebase } from '@/common/libs/firebaseClient';
import {
  firaCode,
  jakartaSans,
  onestSans,
  soraSans,
} from '@/common/styles/fonts';

import defaultSEOConfig from '../../next-seo.config';

const ProgressBar = dynamic(
  () => import('src/common/components/elements/ProgressBar'),
  { ssr: false },
);

const WelcomeModal = dynamic(
  () => import('src/common/components/elements/WelcomeModal'),
  { ssr: false },
);

const AppContent = ({ Component, pageProps, router }: AppProps) => {
  const { enable, disable } = useMusic();
  const routerInstance = useRouter();

  // Track visitor on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Don't track API routes or dashboard routes
      if (url.startsWith('/api') || url.startsWith('/dashboard')) {
        return;
      }

      // Log visitor (non-blocking)
      fetch('/api/visitors/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: url }),
      }).catch((err) => {
        console.error('Failed to log visitor:', err);
      });
    };

    // Track initial page load
    handleRouteChange(routerInstance.asPath);

    // Track route changes
    routerInstance.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      routerInstance.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [routerInstance]);

  return (
    <>
      <WelcomeModal
        onMusicChoice={(enableMusic) => {
          if (enableMusic) {
            enable();
          } else {
            disable();
          }
        }}
      />
      <Layout>
        <CommandPalette />
        <ProgressBar />
        <Component {...pageProps} router={router} />
      </Layout>
    </>
  );
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
    });
    // Initialize Firebase on client only
    initFirebase();
  }, []);

  return (
    <>
      <Script
        src='https://cloud.umami.is/script.js'
        data-website-id='2a660cbf-2041-4705-af1f-f1ddc9873308'
        strategy='afterInteractive'
      />
      <style jsx global>
        {`
          html {
            --jakartaSans-font: ${jakartaSans.style.fontFamily};
            --soraSans-font: ${soraSans.style.fontFamily};
            --firaCode-font: ${firaCode.style.fontFamily};
            --onestSans-font: ${onestSans.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...defaultSEOConfig} />
      <SessionProvider session={session}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <CommandPaletteProvider>
            <MusicProvider>
              <Toaster richColors position='top-right' />
              <AppContent
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
            </MusicProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default App;
