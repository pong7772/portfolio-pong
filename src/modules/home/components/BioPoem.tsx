import { useState } from 'react';

const BioPoem = () => {
  const [isPoemExpanded, setIsPoemExpanded] = useState(false);

  return (
    <figure className='w-full'>
      <figcaption className='mb-3 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 sm:text-sm'>
        Bio‑Poem
      </figcaption>
      <blockquote className='rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 italic text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300 sm:p-5'>
        <div
          className={
            isPoemExpanded
              ? ''
              : 'relative max-h-24 overflow-hidden sm:max-h-32'
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
  );
};

export default BioPoem;
