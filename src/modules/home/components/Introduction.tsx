import { Story } from '@/common/types/stories';

import Stories from './Stories';

interface IntroductionProps {
  stories?: Story[];
}

const Introduction = ({ stories = [] }: IntroductionProps) => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hello, I&apos;m Roth Visothipong</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Full-Stack Developer & EdTech Innovator 🚀
            </li>
            <li>
              Currently in Belgium <span className='ml-1'>🇧🇪</span>
            </li>
            <li>Cambodian 🇰🇭</li>
          </ul>
        </div>
      </div>

      <figure className='mt-8'>
        <figcaption className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
          Bio‑Poem
        </figcaption>
        <blockquote className='mt-3 border-l-2 border-neutral-200 pl-4 italic text-neutral-800 dark:text-neutral-300'>
          <p className='font-serif text-lg leading-relaxed md:leading-loose whitespace-pre-line'>
            Roth
            {'\n'}Tech-head, teammate, foodie, and dreamer,
            {'\n'}Lover of a good football match, food that bites back, and clean, clever code.
            {'\n'}Who gets a buzz from new tech and loves cracking a tough problem.
            {'\n'}Who runs on strong coffee, a solid Wi-Fi signal, and a great playlist.
            {'\n'}Who's always down to help a friend or squash a tricky bug.
            {'\n'}Who dreads slow internet, boring meals, and code that just won't compile.
            {'\n'}Who wants to build cool stuff that helps people learn and grow.
            {'\n'}Living in Hasselt, with a heart still in Cambodia.
            {'\n'}Visothipong
          </p>
        </blockquote>
      </figure>

      {stories.length > 0 && <Stories stories={stories} />}
    </section>
  );
};

export default Introduction;
