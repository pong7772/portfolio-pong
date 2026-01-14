import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';

import Container from '@/common/components/elements/Container';
import DashboardAuth from '@/common/components/elements/DashboardAuth';
import PageHeading from '@/common/components/elements/PageHeading';
import { useDashboardAuth } from '@/common/hooks/useDashboardAuth';
import { getGithubUser } from '@/services/github';

// Import all managers
import { BlogsManager } from '@/modules/dashboard/components/Blogs';
import { ContactMessagesManager } from '@/modules/dashboard/components/ContactMessages';
import { CommentsManager } from '@/modules/dashboard/components/Comments';
import { PPDPostsManager } from '@/modules/dashboard/components/PPDPosts';
import { VisitorsManager } from '@/modules/dashboard/components/Visitors';
import CodingActive from '@/modules/dashboard/components/CodingActive';
import Contributions from '@/modules/dashboard/components/Contributions';
import ProjectsManager from '@/modules/dashboard/components/Projects';
import StoriesManager from '@/modules/dashboard/components/Stories';
import { GITHUB_ACCOUNTS } from '@/common/constant/github';

interface DashboardModulePageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any;
}

const moduleComponents: Record<string, React.ComponentType<any>> = {
  blogs: BlogsManager,
  'ppd-posts': PPDPostsManager,
  comments: CommentsManager,
  'contact-messages': ContactMessagesManager,
  projects: ProjectsManager,
  stories: StoriesManager,
  visitors: VisitorsManager,
  'coding-activity': CodingActive,
  contributions: Contributions as React.ComponentType<any>,
};

const moduleTitles: Record<string, string> = {
  blogs: 'Blogs Management',
  'ppd-posts': 'PPD Posts Management',
  comments: 'Comments Management',
  'contact-messages': 'Contact Messages',
  projects: 'Projects Management',
  stories: 'Stories Management',
  visitors: 'Visitors Analytics',
  'coding-activity': 'Coding Activity',
  contributions: 'GitHub Contributions',
};

const DashboardModulePage: NextPage<DashboardModulePageProps> = ({
  fallback,
}) => {
  const router = useRouter();
  const { module } = router.query;
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
        <NextSeo title='Dashboard - Visothipong' />
        <DashboardAuth onSuccess={() => setShowAuth(false)} />
      </>
    );
  }

  const moduleId = module as string;
  const ModuleComponent = moduleComponents[
    moduleId
  ] as React.ComponentType<any>;
  const pageTitle = moduleTitles[moduleId] || 'Dashboard';

  if (!ModuleComponent) {
    return (
      <Container data-aos='fade-up'>
        <div className='flex min-h-[60vh] flex-col items-center justify-center'>
          <h1 className='mb-4 text-2xl font-bold'>Module not found</h1>
          <p className='mb-6 text-neutral-600 dark:text-neutral-400'>
            The module &quot;{moduleId}&quot; does not exist.
          </p>
          <Link
            href='/dashboard'
            className='rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600'
          >
            Back to Dashboard
          </Link>
        </div>
      </Container>
    );
  }

  // Special handling for contributions module
  const renderContributions = () => {
    if (moduleId === 'contributions') {
      return (
        <div className='space-y-10'>
          {GITHUB_ACCOUNTS?.filter((account) => account?.is_active).map(
            (account, index) => (
              <Contributions
                key={index}
                username={account?.username}
                type={account?.type}
                endpoint={account?.endpoint}
              />
            ),
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo title={`${pageTitle} - Dashboard`} />
      <Container data-aos='fade-up'>
        <div className='mb-6 flex items-center gap-4'>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800'
          >
            <BiArrowBack size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <PageHeading title={pageTitle} />
        {moduleId === 'contributions' ? (
          renderContributions()
        ) : moduleId === 'coding-activity' ? (
          <CodingActive />
        ) : (
          <ModuleComponent />
        )}
      </Container>
    </SWRConfig>
  );
};

export default DashboardModulePage;

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { module: 'blogs' } },
      { params: { module: 'ppd-posts' } },
      { params: { module: 'comments' } },
      { params: { module: 'contact-messages' } },
      { params: { module: 'projects' } },
      { params: { module: 'stories' } },
      { params: { module: 'visitors' } },
      { params: { module: 'coding-activity' } },
      { params: { module: 'contributions' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const githubUserPersonal = await getGithubUser('personal');

  return {
    props: {
      fallback: {
        '/api/github?type=personal': githubUserPersonal?.data,
      },
    },
    revalidate: 1,
  };
};
