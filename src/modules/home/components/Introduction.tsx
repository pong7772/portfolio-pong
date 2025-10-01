const Introduction = () => {
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
            Visothipong
            {'\n'}Driven, innovative, technical, and passionate,
            {'\n'}Lover of coding, education technology, and making an impact,
            {'\n'}Who feels inspired by helping 400,000+ students learn,
            {'\n'}Who needs strong coffee ☕️, fast internet, and time to build,
            {'\n'}Who gives mentorship to junior developers and shares knowledge,
            {'\n'}Who fears stagnation and unused potential,
            {'\n'}Who would like to see technology make education accessible to all,
            {'\n'}From Cambodia to Belgium, building the future of EdTech.
          </p>
        </blockquote>
      </figure>
    </section>
  );
};

export default Introduction;
