import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BiBookContent,
  BiComment,
  BiEnvelope,
  BiFolder,
  BiImage,
  BiUser,
  BiCodeAlt,
  BiBarChart,
  BiGitBranch,
} from 'react-icons/bi';

import Card from '@/common/components/elements/Card';

interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
}

const modules: DashboardModule[] = [
  {
    id: 'blogs',
    title: 'Blogs',
    description: 'Manage your blog posts and articles',
    icon: <BiBookContent size={32} />,
    href: '/dashboard/blogs',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    id: 'ppd-posts',
    title: 'PPD Posts',
    description: 'Manage Personal & Professional Development posts',
    icon: <BiCodeAlt size={32} />,
    href: '/dashboard/ppd-posts',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    id: 'comments',
    title: 'Comments',
    description: 'Manage and moderate comments',
    icon: <BiComment size={32} />,
    href: '/dashboard/comments',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: 'contact-messages',
    title: 'Contact Messages',
    description: 'View and respond to contact form submissions',
    icon: <BiEnvelope size={32} />,
    href: '/dashboard/contact-messages',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Manage your portfolio projects',
    icon: <BiFolder size={32} />,
    href: '/dashboard/projects',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    id: 'stories',
    title: 'Stories',
    description: 'Manage your stories and highlights',
    icon: <BiImage size={32} />,
    href: '/dashboard/stories',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
  },
  {
    id: 'visitors',
    title: 'Visitors',
    description: 'View visitor statistics and analytics',
    icon: <BiUser size={32} />,
    href: '/dashboard/visitors',
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
  },
  {
    id: 'coding-activity',
    title: 'Coding Activity',
    description: 'View your coding activity and statistics',
    icon: <BiBarChart size={32} />,
    href: '/dashboard/coding-activity',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  {
    id: 'contributions',
    title: 'Contributions',
    description: 'View GitHub contributions and activity',
    icon: <BiGitBranch size={32} />,
    href: '/dashboard/contributions',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
];

const DashboardOverview = () => {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='mb-2 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
          Dashboard Modules
        </h2>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Select a module to manage your content
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={module.href}>
              <Card className='group h-full cursor-pointer border-2 border-neutral-200 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:hover:border-neutral-700'>
                <div className='p-6'>
                  <div className='mb-4 flex items-center gap-4'>
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl ${module.bgColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <div className={module.color}>{module.icon}</div>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {module.description}
                  </p>
                  <div className='mt-4 flex items-center text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300'>
                    <span>Open module</span>
                    <svg
                      className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
