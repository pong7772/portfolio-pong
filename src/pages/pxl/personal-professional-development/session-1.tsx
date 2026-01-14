import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';

const PAGE_TITLE = 'Personal and Professional Development';
const PAGE_DESCRIPTION =
  'Visothipong PPD Growth Portfolio - Preparation for Coaching Session 1';

const PersonalProfessionalDevelopment = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Visothipong`}
        description={PAGE_DESCRIPTION}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

        <div className='mx-auto max-w-5xl'>
          {/* Header Section */}
          <header className='my-12 text-center'>
            <h1 className='text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl'>
              Visothipong PPD Growth Portfolio
            </h1>
            <p className='mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-300'>
              Roth Samnang Visothipong
            </p>
            <p className='mt-3 text-xl text-slate-500 dark:text-slate-400'>
              Preparation for Coaching Session 1
            </p>
          </header>

          {/* Section 1: Executive Functions */}
          <div className='mb-10 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-900'>
            <h2 className='mb-6 flex items-center text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mr-3 h-6 w-6 text-indigo-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a3 3 0 100-6 3 3 0 000 6z'
                />
              </svg>
              1. Executive Functions
            </h2>

            <div className='space-y-8'>
              {/* Planning */}
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                  Planning
                </h3>
                <div className='mt-2 flex overflow-hidden rounded-md'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`rating-box flex-1 border border-slate-300 py-2 text-center font-semibold dark:border-slate-600 ${
                        num === 6
                          ? 'border-blue-400 bg-blue-400 text-white'
                          : 'bg-white text-slate-700 dark:bg-neutral-800 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-slate-500 dark:text-slate-400'>
                  Explanation: Do you start learning for an exam on time? Do you
                  make a schedule and stick to it?
                </p>
              </div>

              {/* Organization */}
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                  Organization
                </h3>
                <div className='mt-2 flex overflow-hidden rounded-md'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`rating-box flex-1 border border-slate-300 py-2 text-center font-semibold dark:border-slate-600 ${
                        num === 6
                          ? 'border-blue-400 bg-blue-400 text-white'
                          : 'bg-white text-slate-700 dark:bg-neutral-800 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-slate-500 dark:text-slate-400'>
                  Explanation: How well can you organize your materials? How
                  easily do you find everything? How well can you manage large
                  projects?
                </p>
              </div>

              {/* Time Management */}
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                  Time Management
                </h3>
                <div className='mt-2 flex overflow-hidden rounded-md'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`rating-box flex-1 border border-slate-300 py-2 text-center font-semibold dark:border-slate-600 ${
                        num === 5
                          ? 'border-blue-400 bg-blue-400 text-white'
                          : 'bg-white text-slate-700 dark:bg-neutral-800 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-slate-500 dark:text-slate-400'>
                  Explanation: How well do you keep time commitments? How well
                  can you estimate how long certain schoolwork will take? How
                  good are you at coming up with routines to organize your time?
                </p>
              </div>

              {/* Working Memory */}
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                  Working memory
                </h3>
                <div className='mt-2 flex overflow-hidden rounded-md'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`rating-box flex-1 border border-slate-300 py-2 text-center font-semibold dark:border-slate-600 ${
                        num === 6
                          ? 'border-blue-400 bg-blue-400 text-white'
                          : 'bg-white text-slate-700 dark:bg-neutral-800 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-slate-500 dark:text-slate-400'>
                  Explanation: Do you know what learning strategies you can use
                  to learn? Do you use these learning strategies?
                </p>
              </div>

              {/* Metacognition */}
              <div>
                <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
                  Metacognition
                </h3>
                <div className='mt-2 flex overflow-hidden rounded-md'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`rating-box flex-1 border border-slate-300 py-2 text-center font-semibold dark:border-slate-600 ${
                        num === 5
                          ? 'border-blue-400 bg-blue-400 text-white'
                          : 'bg-white text-slate-700 dark:bg-neutral-800 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-slate-500 dark:text-slate-400'>
                  Explanation: Do you reflect on your own behaviour? Do you ask
                  for help when needed?
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Basic Competences */}
          <div className='mb-10 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-900'>
            <h2 className='mb-6 flex items-center text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mr-3 h-6 w-6 text-indigo-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              2. Basic Competences
            </h2>

            <div className='flex flex-col items-center gap-8 md:flex-row'>
              {/* Competence List */}
              <div className='w-full space-y-3 md:w-2/3'>
                {[
                  { num: 1, text: 'Supervisor of learning', color: 'yellow' },
                  { num: 2, text: 'Educator', color: 'yellow' },
                  { num: 3, text: 'Content expert', color: 'green' },
                  { num: 4, text: 'Organizer', color: 'yellow' },
                  { num: 5, text: 'Innovator and researcher', color: 'green' },
                  { num: 6, text: 'Partner of parents', color: 'red' },
                  { num: 7, text: 'Member of a school team', color: 'yellow' },
                  { num: 8, text: 'Partner of externals', color: 'red' },
                  {
                    num: 9,
                    text: 'Member of the educational community',
                    color: 'yellow',
                  },
                  { num: 10, text: 'Cultural participant', color: 'yellow' },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`flex items-center rounded-lg p-3 font-medium ${
                      item.color === 'red'
                        ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : item.color === 'green'
                          ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}
                  >
                    <span
                      className={`mr-3 h-4 w-4 rounded-full ${
                        item.color === 'red'
                          ? 'bg-red-400'
                          : item.color === 'green'
                            ? 'bg-green-400'
                            : 'bg-yellow-400'
                      }`}
                    />
                    <span className='w-6 font-bold'>{item.num}.</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Image and Key */}
              <div className='flex w-full flex-col items-center text-center md:w-1/3'>
                <svg viewBox='0 0 200 300' className='h-auto w-48'>
                  <g
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    className='text-slate-900 dark:text-slate-100'
                  >
                    {/* Feet */}
                    <path
                      d='M 60,290 C 40,290 40,260 60,260 L 90,260 V 290 Z'
                      fill='#FBBF24'
                    />
                    <path
                      d='M 140,290 C 160,290 160,260 140,260 L 110,260 V 290 Z'
                      fill='#F87171'
                    />
                    {/* Legs */}
                    <path
                      d='M 90,260 L 60,260 C 60,220 80,190 100,190 L 100,260 Z'
                      fill='#FDE68A'
                    />
                    <path
                      d='M 110,260 L 140,260 C 140,220 120,190 100,190 L 100,260 Z'
                      fill='#FDE68A'
                    />
                    {/* Torso */}
                    <path
                      d='M 100,190 C 130,190 140,155 140,120 L 60,120 C 60,155 70,190 100,190 Z'
                      fill='#FDE68A'
                    />
                    {/* Arms */}
                    <path
                      d='M 60,120 C 30,120 20,90 40,70 C 55,80 60,100 60,120 Z'
                      fill='#A7F3D0'
                    />
                    <path
                      d='M 140,120 C 170,120 180,90 160,70 C 145,80 140,100 140,120 Z'
                      fill='#A7F3D0'
                    />
                    {/* Head */}
                    <circle cx='100' cy='85' r='35' fill='#A7F3D0' />
                    {/* Heart */}
                    <path
                      d='M110 135 C 105 125, 120 120, 125 130 C 130 120, 145 125, 140 135 L 125 145 Z'
                      fill='#F87171'
                    />
                    {/* Dividing Lines */}
                    <line x1='100' y1='120' x2='100' y2='290' />
                    <line x1='60' y1='155' x2='140' y2='155' />
                  </g>
                  <g
                    fontFamily='Inter, sans-serif'
                    fontSize='18'
                    textAnchor='middle'
                    fill='currentColor'
                    fontWeight='bold'
                    className='text-slate-900 dark:text-slate-100'
                  >
                    <text x='100' y='90'>
                      1
                    </text>
                    <text x='45' y='95'>
                      2
                    </text>
                    <text x='155' y='95'>
                      3
                    </text>
                    <text x='80' y='140'>
                      4
                    </text>
                    <text x='120' y='140'>
                      5
                    </text>
                    <text x='100' y='175'>
                      6
                    </text>
                    <text x='75' y='280'>
                      7
                    </text>
                    <text x='125' y='280'>
                      8
                    </text>
                    <text x='80' y='230'>
                      9
                    </text>
                    <text x='120' y='230'>
                      10
                    </text>
                  </g>
                </svg>

                <div className='mt-4 space-y-2 self-start text-left md:self-center'>
                  <div className='flex items-center'>
                    <span className='mr-3 h-4 w-4 rounded-full bg-red-400' />
                    <span className='font-semibold text-slate-900 dark:text-slate-100'>
                      WEAK
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='mr-3 h-4 w-4 rounded-full bg-yellow-400' />
                    <span className='font-semibold text-slate-900 dark:text-slate-100'>
                      GOOD, BUT NOT STRONG YET
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='mr-3 h-4 w-4 rounded-full bg-green-400' />
                    <span className='font-semibold text-slate-900 dark:text-slate-100'>
                      STRONG
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: GRROW Model */}
          <div className='rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-900'>
            <h2 className='mb-6 flex items-center text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mr-3 h-6 w-6 text-indigo-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
              </svg>
              3. Learning Goal: GRROW Model
            </h2>

            <div className='space-y-6'>
              {/* Goal */}
              <div className='rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20'>
                <h3 className='flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200'>
                  <svg
                    className='mr-3 h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  Goal
                </h3>
                <p className='mt-3 pl-10 text-lg italic text-slate-500 dark:text-slate-400'>
                  What do you want to achieve or break through? What will you
                  focus on in the coming internship period?
                </p>
                <p className='mt-2 pl-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                  My main goal is to learn how to design and deliver engaging,
                  hands-on STEM projects. I will focus on observing the
                  'organizer' and 'supervisor of learning' competences.
                </p>
              </div>

              {/* Reality */}
              <div className='rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20'>
                <h3 className='flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200'>
                  <svg
                    className='mr-3 h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  Reality
                </h3>
                <p className='mt-3 pl-10 text-lg italic text-slate-500 dark:text-slate-400'>
                  What is the concrete situation as it stands today?
                  Specifically, what things are going wrong because of not
                  mastering these skills?
                </p>
                <p className='mt-2 pl-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                  My learning is theoretical as I don't have an internship. The
                  challenge is converting observation into confident practice.
                </p>
              </div>

              {/* Resources */}
              <div className='rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20'>
                <h3 className='flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200'>
                  <svg
                    className='mr-3 h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                    />
                  </svg>
                  Resources
                </h3>
                <p className='mt-3 pl-10 text-lg italic text-slate-500 dark:text-slate-400'>
                  What do you need to achieve the desired situation? Who could
                  help you? What skills/strengths can you use?
                </p>
                <p className='mt-2 pl-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                  My key resources are the teachers I can observe and my PPD
                  coach. My strength in metacognition will help me analyze what
                  I see.
                </p>
              </div>

              {/* Options */}
              <div className='rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20'>
                <h3 className='flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200'>
                  <svg
                    className='mr-3 h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                  Options
                </h3>
                <p className='mt-3 pl-10 text-lg italic text-slate-500 dark:text-slate-400'>
                  What different options are there to work towards your goal?
                </p>
                <ul className='mt-2 list-inside list-disc pl-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                  <li>Use a focused checklist for each observation.</li>
                  <li>
                    Conduct short, structured interviews post-observation.
                  </li>
                  <li>
                    Keep a reflective journal comparing my thoughts to the
                    teacher's actions.
                  </li>
                </ul>
              </div>

              {/* Will Do */}
              <div className='rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20'>
                <h3 className='flex items-center text-xl font-bold text-indigo-800 dark:text-indigo-200'>
                  <svg
                    className='mr-3 h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Will Do
                </h3>
                <p className='mt-3 pl-10 text-lg italic text-slate-500 dark:text-slate-400'>
                  What will you do and when?
                </p>
                <ul className='mt-2 list-inside list-disc pl-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                  <li>This Week: Schedule two observation sessions.</li>
                  <li>Before Observation: Create a focused checklist.</li>
                  <li>
                    After Observation: Write a reflection and follow up with a
                    thank-you note.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PersonalProfessionalDevelopment;
