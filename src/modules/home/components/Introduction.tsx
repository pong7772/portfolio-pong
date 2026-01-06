import { useState } from 'react';

import Image from '@/common/components/elements/Image';
import StoryModal from '@/common/components/elements/StoryModal';
import { Story } from '@/common/types/stories';

interface IntroductionProps {
  stories?: Story[];
}

const Introduction = ({ stories = [] }: IntroductionProps) => {
  const [isPoemExpanded, setIsPoemExpanded] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <section className='bg-cover bg-no-repeat'>
      <div className='space-y-3 sm:space-y-4'>
        <div className='flex flex-wrap items-center gap-2 text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl'>
          <h1 className='break-words'>Hello, I&apos;m Roth Visothipong</h1>
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-3 sm:space-y-4'>
          <ul className='ml-4 flex list-disc flex-col gap-1.5 text-sm text-neutral-700 dark:text-neutral-400 sm:ml-5 sm:flex-row sm:flex-wrap sm:gap-4 sm:text-base md:gap-6 lg:gap-8 xl:gap-10'>
            <li className='break-words'>
              Full-Stack Developer & EdTech Innovator 🚀
            </li>
            <li className='break-words'>
              Currently in Belgium <span className='ml-1'>🇧🇪</span>
            </li>
            <li className='break-words'>Cambodian 🇰🇭</li>
          </ul>
        </div>
      </div>

      {stories.length > 0 && (
        <div className='mt-6 sm:mt-8'>
          <div className='mb-3 sm:mb-4'>
            <h3 className='text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:text-sm'>
              Stories about Roth Visothipong
            </h3>
          </div>

          <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-2 sm:gap-4 md:gap-5'>
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className='group flex min-w-[72px] snap-start flex-col items-center sm:min-w-[84px] md:min-w-[96px]'
                aria-label={story.title}
              >
                <div className='relative h-16 w-16 rounded-full border-2 border-green-500 p-0.5 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28'>
                  <div className='relative h-full w-full overflow-hidden rounded-full'>
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className='object-cover transition-transform duration-300 group-hover:scale-105'
                      priority
                    />
                  </div>
                </div>
                <span className='mt-1.5 line-clamp-1 max-w-[72px] text-center text-[10px] text-neutral-700 dark:text-neutral-300 sm:mt-2 sm:max-w-[92px] sm:text-xs md:max-w-[112px] md:text-[13px]'>
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <figure className='mt-6 sm:mt-8'>
        <figcaption className='text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:text-sm'>
          Bio‑Poem
        </figcaption>
        <blockquote className='mt-2 border-l-2 border-neutral-200 pl-3 italic text-neutral-800 dark:text-neutral-300 sm:mt-3 sm:pl-4'>
          <div
            className={
              isPoemExpanded
                ? ''
                : 'relative max-h-48 overflow-hidden sm:max-h-56 md:max-h-64'
            }
          >
            <p className='whitespace-pre-line break-words font-serif text-sm leading-relaxed sm:text-base sm:leading-relaxed md:text-lg md:leading-loose'>
              Roth
              {'\n'}Tech-head, teammate, foodie, and dreamer,
              {'\n'}Lover of a good football match, food that bites back, and
              clean, clever code.
              {'\n'}Who gets a buzz from new tech and loves cracking a tough
              problem.
              {'\n'}Who runs on strong coffee, a solid Wi-Fi signal, and a great
              playlist.
              {'\n'}Who dreads slow internet, boring meals, and code that just
              won't compile.
              {'\n'}Who wants to build cool stuff that helps people learn and
              grow.
              {'\n'}Living in Hasselt, with a heart still in Cambodia.
              {'\n'}Visothipong
            </p>
            {!isPoemExpanded && (
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-neutral-900 sm:h-12 md:h-16'></div>
            )}
          </div>
          <button
            type='button'
            onClick={() => setIsPoemExpanded((v) => !v)}
            className='mt-2 select-none text-xs font-medium text-green-600 hover:underline dark:text-green-400 sm:mt-3 sm:text-sm'
            aria-expanded={isPoemExpanded}
            aria-controls='bio-poem'
          >
            {isPoemExpanded ? 'Read less' : 'Read more'}
          </button>
        </blockquote>
      </figure>

      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Introduction;
