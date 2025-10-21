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
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2 text-2xl font-medium sm:text-3xl lg:text-4xl'>
          <h1>Hello, I&apos;m Roth Visothipong</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 sm:flex-row sm:flex-wrap sm:gap-6 lg:gap-10'>
            <li>Full-Stack Developer & EdTech Innovator 🚀</li>
            <li>
              Currently in Belgium <span className='ml-1'>🇧🇪</span>
            </li>
            <li>Cambodian 🇰🇭</li>
          </ul>
        </div>
      </div>

      {stories.length > 0 && (
        <div className='mt-8'>
          <div className='mb-4'>
            <h3 className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
              Stories about Roth Visothipong
            </h3>
          </div>

          {/* Circular stories with green border */}
          <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 sm:gap-5'>
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className='group flex min-w-[84px] snap-start flex-col items-center'
                aria-label={story.title}
              >
                <div className='relative h-20 w-20 rounded-full border-2 border-green-500 p-0.5 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-24 lg:w-24'>
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
                <span className='mt-2 line-clamp-1 max-w-[92px] text-center text-xs text-neutral-700 dark:text-neutral-300 sm:max-w-[112px] sm:text-[13px] md:max-w-[128px]'>
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <figure className='mt-8'>
        <figcaption className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
          Bio‑Poem
        </figcaption>
        <blockquote className='mt-3 border-l-2 border-neutral-200 pl-4 italic text-neutral-800 dark:text-neutral-300'>
          <div
            className={
              isPoemExpanded
                ? ''
                : 'relative max-h-56 overflow-hidden md:max-h-64'
            }
          >
            <p className='whitespace-pre-line font-serif text-base leading-relaxed sm:text-lg md:leading-loose'>
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
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-neutral-900 sm:h-16'></div>
            )}
          </div>
          <button
            type='button'
            onClick={() => setIsPoemExpanded((v) => !v)}
            className='mt-3 select-none text-sm font-medium text-green-600 hover:underline dark:text-green-400'
            aria-expanded={isPoemExpanded}
            aria-controls='bio-poem'
          >
            {isPoemExpanded ? 'Read less' : 'Read more'}
          </button>
        </blockquote>
      </figure>

      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Introduction;
