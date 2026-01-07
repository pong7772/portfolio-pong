import {
  SiDart,
  SiFlutter,
  SiReact,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxtdotjs,
  SiRedux,
  SiFirebase,
  SiAmazonaws,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiKotlin,
  SiAndroid,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

import SectionHeading from '@/common/components/elements/SectionHeading';
import { STACKS } from '@/common/constant/stacks';

interface SkillCategory {
  title: string;
  description?: string;
  skills: Array<{
    name: string;
    icon?: JSX.Element;
    isExpert?: boolean;
  }>;
}

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: '🚀 Core Expertise',
      description: 'Technologies used to scale applications to 400,000+ users',
      skills: [
        {
          name: 'Flutter',
          icon: <SiFlutter size={24} className='text-blue-400' />,
          isExpert: true,
        },
        {
          name: 'Dart',
          icon: <SiDart size={24} className='text-blue-500' />,
        },
        {
          name: 'React Native',
          icon: <SiReact size={24} className='text-sky-500' />,
        },
        {
          name: 'Kotlin',
          icon: <SiKotlin size={24} className='text-purple-500' />,
        },
        {
          name: 'Android SDK',
          icon: <SiAndroid size={24} className='text-green-500' />,
        },
        {
          name: 'PHP Laravel',
          icon: STACKS['Laravel'] || (
            <SiLaravel size={24} className='text-red-500' />
          ),
          isExpert: true,
        },
        {
          name: 'Node.js',
          icon: STACKS['Node.js'] || (
            <SiNodedotjs size={24} className='text-green-600' />
          ),
        },
        {
          name: 'Express.js',
          icon: STACKS['Express'] || <SiExpress size={24} />,
        },
        {
          name: 'Nest.js',
          icon: <SiNestjs size={24} className='text-red-500' />,
        },
        {
          name: 'React.js',
          icon: STACKS['React.js'] || (
            <SiReact size={24} className='text-sky-500' />
          ),
        },
        {
          name: 'Next.js',
          icon: STACKS['Next.js'] || <SiNextdotjs size={24} />,
        },
        {
          name: 'Vue.js',
          icon: STACKS['Vue.js'] || (
            <SiVuedotjs size={24} className='text-green-500' />
          ),
        },
        {
          name: 'Nuxt.js',
          icon: STACKS['Nuxt.js'] || (
            <SiNuxtdotjs size={24} className='text-green-400' />
          ),
        },
        {
          name: 'Redux',
          icon: STACKS['Redux'] || (
            <SiRedux size={24} className='text-purple-500' />
          ),
        },
        {
          name: 'Firebase',
          icon: STACKS['Firebase'] || (
            <SiFirebase size={24} className='text-yellow-500' />
          ),
        },
        {
          name: 'AWS',
          icon: <SiAmazonaws size={24} className='text-orange-500' />,
        },
        {
          name: 'PostgreSQL',
          icon: <SiPostgresql size={24} className='text-blue-600' />,
        },
        {
          name: 'MongoDB',
          icon: <SiMongodb size={24} className='text-green-500' />,
        },
      ],
    },
    {
      title: '🛠️ Engineering & Architecture',
      skills: [
        {
          name: 'Docker',
          icon: <SiDocker size={24} className='text-blue-500' />,
        },
        {
          name: 'Git/GitHub',
          icon: <SiGithub size={24} />,
        },
        {
          name: 'CI/CD',
          icon: <SiGithub size={24} className='text-purple-500' />,
        },
        {
          name: 'Microservices',
        },
        {
          name: 'MVC',
        },
        {
          name: 'Bloc Pattern',
        },
        {
          name: 'Agile/Scrum',
        },
        {
          name: 'TDD',
        },
      ],
    },
    {
      title: '🎓 EdTech & AI Specialization',
      skills: [
        {
          name: 'Digital Worksheets',
        },
        {
          name: 'Adaptive Learning',
        },
        {
          name: 'Gamification',
        },
        {
          name: 'Learning Analytics',
        },
        {
          name: 'Instructional Design',
        },
      ],
    },
  ];

  return (
    <section className='space-y-8'>
      <div className='space-y-2'>
        <SectionHeading title='Skills & Expertise' />
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Technologies and tools I master, organized by expertise areas
        </p>
      </div>

      <div className='space-y-8'>
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className='rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50'
          >
            <div className='mb-4'>
              <h3 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200'>
                {category.title}
              </h3>
              {category.description && (
                <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                  {category.description}
                </p>
              )}
            </div>

            <div className='flex flex-wrap gap-3'>
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className='group flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-blue-600 dark:hover:bg-blue-900/20'
                >
                  {skill.icon ? (
                    <div className='flex-shrink-0'>{skill.icon}</div>
                  ) : (
                    <div className='h-6 w-6 flex-shrink-0 rounded bg-gradient-to-br from-blue-400 to-purple-500 opacity-60 group-hover:opacity-100' />
                  )}
                  <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    {skill.name}
                  </span>
                  {skill.isExpert && (
                    <span className='ml-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white'>
                      Expert
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills Summary */}
      <div className='rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 dark:border-neutral-800 dark:from-neutral-900/50 dark:to-neutral-800/50'>
        <h3 className='mb-3 text-base font-semibold text-neutral-800 dark:text-neutral-200'>
          🌟 Key Achievements
        </h3>
        <ul className='space-y-2 text-sm text-neutral-700 dark:text-neutral-300'>
          <li className='flex items-start gap-2'>
            <span className='mt-1 text-green-500'>✓</span>
            <span>
              <strong>Scalability Expert:</strong> Managed platform with 20,000+
              daily active users
            </span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='mt-1 text-green-500'>✓</span>
            <span>
              <strong>Rapid Prototyping:</strong> Concept to deployment for
              e-commerce and educational apps
            </span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='mt-1 text-green-500'>✓</span>
            <span>
              <strong>Technical Educator:</strong> Simplifying complex coding
              concepts for students and junior developers
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SkillsSection;
