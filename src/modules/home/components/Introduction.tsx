import { useState } from 'react';

import Image from '@/common/components/elements/Image';
import StoryModal from '@/common/components/elements/StoryModal';
import { Story } from '@/common/types/stories';

interface IntroductionProps {
  stories?: Story[];
}

const Introduction = ({ stories = [] }: IntroductionProps) => {
  const [isPoemExpanded, setIsPoemExpanded] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStoryClick = (story: Story) => {
    const index = stories.findIndex((s) => s.id === story.id);
    setSelectedStoryIndex(index >= 0 ? index : 0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStoryIndex(null);
  };

  const handleStoryChange = (newIndex: number) => {
    setSelectedStoryIndex(newIndex);
  };

  const currentStory =
    selectedStoryIndex !== null ? stories[selectedStoryIndex] : null;

  return (
    <section className='bg-cover bg-no-repeat'>
      <div className='space-y-3 sm:space-y-4'>
        <div className='flex flex-wrap items-center gap-2 text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl'>
          <h1 className='break-words'>
            Hello, I&apos;m Roth Samnang Visothipong
          </h1>
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

      {/* About Me Summary */}
      <div className='mt-8 sm:mt-10'>
        <div className='rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900/50 dark:to-neutral-800/30 sm:p-8'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
              <span className='text-xl'>👨‍💻</span>
            </div>
            <h2 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200 sm:text-xl'>
              About Me
            </h2>
          </div>
          <p className='leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base md:text-lg'>
            I am a Full-Stack Developer with a proven track record of building
            scalable solutions, including a national EdTech platform serving
            over{' '}
            <span className='font-semibold text-green-600 dark:text-green-400'>
              400,000 students
            </span>
            . Currently pursuing a{' '}
            <span className='font-medium text-blue-600 dark:text-blue-400'>
              Master of Education
            </span>{' '}
            in Belgium, I specialize in combining robust engineering (
            <span className='font-mono text-sm'>Laravel/Flutter</span>) with
            gamified learning experiences to drive global educational impact.
          </p>
        </div>
      </div>

      {/* Bio-Poem Section - Made Smaller */}
      <figure className='mt-6 sm:mt-8'>
        <figcaption className='mb-3 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:text-sm'>
          Bio‑Poem
        </figcaption>
        <blockquote className='rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 italic text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300 sm:p-5'>
          <div
            className={
              isPoemExpanded
                ? ''
                : 'relative max-h-32 overflow-hidden sm:max-h-40'
            }
          >
            <p className='whitespace-pre-line break-words font-serif text-xs leading-relaxed sm:text-sm sm:leading-relaxed'>
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
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-neutral-50 dark:from-neutral-900/30 sm:h-10'></div>
            )}
          </div>
          <button
            type='button'
            onClick={() => setIsPoemExpanded((v) => !v)}
            className='mt-3 select-none text-xs font-medium text-green-600 transition-colors hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300 sm:text-sm'
            aria-expanded={isPoemExpanded}
            aria-controls='bio-poem'
          >
            {isPoemExpanded ? 'Read less' : 'Read more'}
          </button>
        </blockquote>
      </figure>

      <StoryModal
        story={currentStory}
        stories={stories}
        currentStoryIndex={selectedStoryIndex ?? 0}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStoryChange={handleStoryChange}
      />
    </section>
  );
};

export default Introduction;
