import Breakline from '@/common/components/elements/Breakline';
import { GITHUB_ACCOUNTS } from '@/common/constant/github';

import { BlogsManager } from './Blogs';
import { ContactMessagesManager } from './ContactMessages';
import { CommentsManager } from './Comments';
import { VisitorsManager } from './Visitors';
import CodingActive from './CodingActive';
import Contributions from './Contributions';
import ProjectsManager from './Projects';
import StoriesManager from './Stories';

const Dashboard = () => {
  return (
    <>
      <ContactMessagesManager />
      <Breakline className='mb-8 mt-10' />
      <CommentsManager />
      <Breakline className='mb-8 mt-10' />
      <VisitorsManager />
      <Breakline className='mb-8 mt-10' />
      <BlogsManager />
      <Breakline className='mb-8 mt-10' />
      <StoriesManager />
      <Breakline className='mb-8 mt-10' />
      <ProjectsManager />
      <Breakline className='mb-8 mt-10' />
      <CodingActive />
      <Breakline className='mb-8 mt-10' />
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
    </>
  );
};

export default Dashboard;
