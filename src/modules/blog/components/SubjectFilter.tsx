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
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-base font-semibold text-neutral-800 dark:text-neutral-200'>
          Filter by Subject
        </h3>
        {selectedSubject && (
          <button
            onClick={handleClearFilter}
            className='flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          >
            Clear
          </button>
        )}
      </div>

      <div className='flex flex-wrap gap-2'>
        {subjects.map((subject, index) => {
          const isSelected = selectedSubject === subject.id;
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: index * 0.03 }}
              onClick={() => handleSubjectClick(subject)}
              className={clsx(
                'group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105',
                isSelected
                  ? `border-transparent bg-gradient-to-r ${subject.color} text-white shadow-md`
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700',
              )}
            >
              <div
                className={clsx(
                  'flex-shrink-0',
                  isSelected
                    ? 'text-white'
                    : 'text-neutral-600 dark:text-neutral-400',
                )}
              >
                {subject.icon}
              </div>
              <span
                className={clsx(
                  'font-semibold',
                  isSelected
                    ? 'text-white'
                    : 'text-neutral-800 dark:text-neutral-200',
                )}
              >
                {subject.name}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='ml-1 flex-shrink-0'
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
                      strokeWidth={2.5}
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
