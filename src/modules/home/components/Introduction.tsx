import { useRouter } from 'next/router';

import Image from '@/common/components/elements/Image';
import { Story } from '@/common/types/stories';

interface IntroductionProps {
  stories?: Story[];
}

const Introduction = ({ stories = [] }: IntroductionProps) => {
  const router = useRouter();

  const handleStoryClick = (story: Story) => {
    if (story.link) {
      router.push(story.link);
      return;
    }
    router.push(`/stories/${story.id}`);
  };

  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hello, I&apos;m Roth Visothipong</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>Full-Stack Developer & EdTech Innovator 🚀</li>
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
          <p className='whitespace-pre-line font-serif text-lg leading-relaxed md:leading-loose'>
            Roth
            {'\n'}Tech-head, teammate, foodie, and dreamer,
            {'\n'}Lover of a good football match, food that bites back, and
            clean, clever code.
            {'\n'}Who gets a buzz from new tech and loves cracking a tough
            problem.
            {'\n'}Who runs on strong coffee, a solid Wi-Fi signal, and a great
            playlist.
            {'\n'}Who's always down to help a friend or squash a tricky bug.
            {'\n'}Who dreads slow internet, boring meals, and code that just
            won't compile.
            {'\n'}Who wants to build cool stuff that helps people learn and
            grow.
            {'\n'}Living in Hasselt, with a heart still in Cambodia.
            {'\n'}Visothipong
          </p>
        </blockquote>
      </figure>

      {stories.length > 0 && (
        <div className='mt-10'>
          <div className='mb-4'>
            <h3 className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
              Stories
            </h3>
          </div>

          {/* Redesigned stories grid */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className='group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900'
                aria-label={story.title}
              >
                <div className='relative h-48 w-full sm:h-56'>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90' />
                  <div className='absolute inset-x-0 bottom-0 p-4 text-left text-white'>
                    <h4 className='line-clamp-1 text-lg font-semibold'>
                      {story.title}
                    </h4>
                    {story.description && (
                      <p className='mt-1 line-clamp-2 text-sm text-neutral-200'>
                        {story.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex items-center justify-between px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300'>
                  <span className='truncate'>Tap to read</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
                    aria-hidden='true'
                  >
                    <path d='M13.5 4.5a.75.75 0 0 0 0 1.5h4.69l-9.72 9.72a.75.75 0 1 0 1.06 1.06l9.72-9.72v4.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5Z' />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Introduction;
