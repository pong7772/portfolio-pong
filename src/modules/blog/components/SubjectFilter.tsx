import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  HiAcademicCap,
  HiUser,
  HiLightBulb,
  HiBookOpen,
  HiGlobeAlt,
} from 'react-icons/hi';

interface SubjectFilterProps {
  selectedSubject: string | null;
  onSubjectSelect: (subject: string | null, tags?: string) => void;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: JSX.Element;
  color: string;
}

const subjects: Subject[] = [
  {
    id: 'internationalist',
    name: 'The Internationalist',
    description: 'International, PXL, Belgium',
    tags: ['international', 'pxl', 'belgium'],
    icon: <HiGlobeAlt size={20} />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'personal-development',
    name: 'Personal & Professional Development',
    description: 'Personal growth and career development',
    tags: ['personal', 'development'],
    icon: <HiUser size={20} />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'about-myself',
    name: 'About Myself',
    description: 'My story, journey, and experiences',
    tags: ['visothipong', 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស', 'roth', 'pong'],
    icon: <HiBookOpen size={20} />,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'ai-research',
    name: 'AI Research Project',
    description: 'AI, Education, Cambodia',
    tags: ['ai', 'education', 'cambodia'],
    icon: <HiLightBulb size={20} />,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'moeys-edtech',
    name: 'MoEYS EdTech',
    description: 'MoEYS and other EdTech projects',
    tags: ['moeys', 'other'],
    icon: <HiAcademicCap size={20} />,
    color: 'from-teal-500 to-cyan-600',
  },
];

const SubjectFilter = ({
  selectedSubject,
  onSubjectSelect,
}: SubjectFilterProps) => {
  const router = useRouter();

  const handleSubjectClick = (subject: Subject) => {
    if (selectedSubject === subject.id) {
      // Deselect if already selected
      onSubjectSelect(null, undefined);
      router.push(
        {
          pathname: '/blog',
          query: router.query.search ? { search: router.query.search } : {},
        },
        undefined,
        { shallow: true },
      );
    } else {
      // Select new subject
      onSubjectSelect(subject.id, subject.tags.join(','));
      router.push(
        {
          pathname: '/blog',
          query: {
            ...(router.query.search && { search: router.query.search }),
            subject: subject.id,
            tags: subject.tags.join(','),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  const handleClearFilter = () => {
    onSubjectSelect(null, undefined);
    router.push(
      {
        pathname: '/blog',
        query: router.query.search ? { search: router.query.search } : {},
      },
      undefined,
      { shallow: true },
    );
  };

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-neutral-800 dark:text-neutral-200'>
            Browse by Subject
          </h3>
          <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
            Explore blog posts organized by main topics
          </p>
        </div>
        {selectedSubject && (
          <button
            onClick={handleClearFilter}
            className='flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          >
            Clear filter
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {subjects.map((subject, index) => {
          const isSelected = selectedSubject === subject.id;
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => handleSubjectClick(subject)}
              className={clsx(
                'group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.02]',
                isSelected
                  ? `border-transparent bg-gradient-to-br ${subject.color} text-white shadow-lg`
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700',
              )}
            >
              <div
                className={clsx(
                  'rounded-lg p-2',
                  isSelected
                    ? 'bg-white/20'
                    : 'bg-neutral-100 dark:bg-neutral-800',
                )}
              >
                <div
                  className={clsx(
                    isSelected
                      ? 'text-white'
                      : 'text-neutral-700 dark:text-neutral-300',
                  )}
                >
                  {subject.icon}
                </div>
              </div>
              <div className='flex-1'>
                <h4
                  className={clsx(
                    'mb-1 font-semibold',
                    isSelected
                      ? 'text-white'
                      : 'text-neutral-800 dark:text-neutral-200',
                  )}
                >
                  {subject.name}
                </h4>
                <p
                  className={clsx(
                    'text-xs',
                    isSelected
                      ? 'text-white/80'
                      : 'text-neutral-600 dark:text-neutral-400',
                  )}
                >
                  {subject.description}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='absolute right-2 top-2 rounded-full bg-white/20 p-1'
                >
                  <svg
                    className='h-4 w-4 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectFilter;
