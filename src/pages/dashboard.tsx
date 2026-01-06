import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

import Container from '@/common/components/elements/Container';
import DashboardAuth from '@/common/components/elements/DashboardAuth';
import PageHeading from '@/common/components/elements/PageHeading';
import { useDashboardAuth } from '@/common/hooks/useDashboardAuth';
import Dashboard from '@/modules/dashboard';
import { getGithubUser } from '@/services/github';

interface DashboardPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any;
}

const PAGE_TITLE = 'Dashboard';
const PAGE_DESCRIPTION =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions.';

const DashboardPage: NextPage<DashboardPageProps> = ({ fallback }) => {
  const { isAuthenticated, isLoading } = useDashboardAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuth(true);
    } else if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <Container data-aos='fade-up'>
        <div className='flex min-h-[60vh] items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500' />
        </div>
      </Container>
    );
  }

  if (!isAuthenticated || showAuth) {
    return (
      <>
        <NextSeo title={`${PAGE_TITLE} - Visothipong`} />
        <DashboardAuth onSuccess={() => setShowAuth(false)} />
      </>
    );
  }

  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title={`${PAGE_TITLE} - Visothipong`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Dashboard />
      </Container>
    </SWRConfig>
  );
};

export default DashboardPage;

export const getStaticProps: GetStaticProps = async () => {
  // const readStats = await getReadStats();
  const githubUserPersonal = await getGithubUser('personal');

  return {
    props: {
      fallback: {
        // '/api/read-stats': readStats.data,
        '/api/github?type=personal': githubUserPersonal?.data,
      },
    },
    revalidate: 1,
  };
};
