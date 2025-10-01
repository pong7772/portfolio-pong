const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hello, I&apos;m Visothipong</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Currently Studying in Belgium <span className='ml-1'>🇧🇪</span>
            </li>
            <li>Working remotely</li>
          </ul>
        </div>
      </div>

      <figure className='mt-8'>
        <figcaption className='text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400'>
          Bio‑Poem
        </figcaption>
        <blockquote className='mt-3 border-l-2 border-neutral-200 pl-4 italic text-neutral-800 dark:text-neutral-300'>
          <p className='font-serif text-lg leading-relaxed md:leading-loose whitespace-pre-line'>
            Visothipong
            {'\n'}Driven, supportive, technical, and curious,
            {'\n'}Lover of the football, spicy food, and Cafee ☕️,
            {'\n'}Who feels inspired by innovation and excited by a new challenge,
            {'\n'}Who needs strong coffee, fast internet, and time to build,
            {'\n'}Who gives help to his friends ,
            {'\n'}Who fears missed opportunities and unsolved puzzles,
            {'\n'}Who would like to see technology make education accessible to all.
          </p>
        </blockquote>
      </figure>
    </section>
  );
};

export default Introduction;
