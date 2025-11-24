import React from 'react';
import { NextSeo } from 'next-seo';
import {
  FiClipboard as ClipboardList,
  FiTarget as Target,
  FiLightbulb as Lightbulb,
  FiCheckSquare as CheckSquare,
  FiUpload as Upload,
  FiCopy as Copy,
} from 'react-icons/fi';

import Container from '@/common/components/elements/Container';

const PAGE_TITLE = 'PPD Growth Portfolio - Session 2';
const PAGE_DESCRIPTION = 'Visothipong - Preparation for Coaching Session 2';

export default function Session2() {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Visothipong`}
        description={PAGE_DESCRIPTION}
      />
      <Container>
        <div className='min-h-screen bg-slate-50 px-4 py-12 font-sans text-slate-700 dark:bg-neutral-900 dark:text-slate-300 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl'>
            {/* Header */}
            <header className='mb-12 text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl'>
                PPD Growth Portfolio
              </h1>
              <p className='mt-4 text-2xl font-semibold text-indigo-600 dark:text-indigo-400'>
                Visothipong
              </p>
              <p className='mt-2 text-xl text-slate-500 dark:text-slate-400'>
                Preparation for Coaching Session 2
              </p>
            </header>

            {/* Instructions Card */}
            <div className='mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-6 text-center shadow-sm dark:border-indigo-800 dark:bg-indigo-900/20'>
              <h2 className='mb-2 text-sm font-bold uppercase tracking-wide text-indigo-900 dark:text-indigo-200'>
                Instructions
              </h2>
              <p className='mb-6 font-medium text-indigo-800 dark:text-indigo-300'>
                Your interview will take place in November / December (Book via
                BB).
              </p>
              <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                <div className='flex items-center justify-center gap-2 rounded-lg border border-indigo-100 bg-white px-5 py-3 font-medium text-indigo-600 shadow-sm dark:border-indigo-800 dark:bg-neutral-800 dark:text-indigo-400'>
                  <Upload size={18} />
                  <span>1. Upload to BB folder</span>
                </div>
                <div className='flex items-center justify-center gap-2 rounded-lg border border-indigo-100 bg-white px-5 py-3 font-medium text-indigo-600 shadow-sm dark:border-indigo-800 dark:bg-neutral-800 dark:text-indigo-400'>
                  <Copy size={18} />
                  <span>2. Copy to OneNote</span>
                </div>
              </div>
            </div>

            {/* 1. REALITY */}
            <section className='mb-8 rounded-xl border border-slate-100 bg-white p-8 shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
              <div className='mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4 dark:border-neutral-700'>
                <ClipboardList
                  className='text-indigo-600 dark:text-indigo-400'
                  size={28}
                />
                <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
                  1. Reality - Where are you today?
                </h2>
              </div>

              <div className='mb-8'>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  Where do you currently stand in your competences (Organizer &
                  Supervisor)?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    Honestly, things didn't go exactly as planned. I aimed to
                    improve as an Organizer and Supervisor of Learning by
                    watching a STEM class, but I ended up observing a friend who
                    teaches English to primary kids instead. Surprisingly, it
                    was really helpful. I saw how incredibly clear and strict
                    she has to be with instructions. It made me realize that
                    while I have experience with older students, I'm still just
                    "Good, but not strong yet." I need to learn how to mix that
                    high school experience with the structured clarity I saw in
                    the primary classroom.
                  </p>
                </div>
              </div>

              <div className='mb-8'>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  What actions have you taken to work towards this learning
                  goal?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    Since I couldn't find a stranger to observe, I used my own
                    network. I sat in on my friend's classes here in Belgium. I
                    didn't just watch passively, though; I spent time comparing
                    what she did with how I used to teach high school back home,
                    specifically looking for differences in how we handle the
                    class.
                  </p>
                </div>
              </div>

              <div>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  How did you experience the observations? Did you encounter
                  yourself?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    It was a bit of an eye-opener. I'll admit, at first I
                    thought, "What can primary English teach me about high
                    school Science?" But I was wrong. Classroom management is
                    universal. I saw my friend use these little non-verbal cues
                    to get silence, and it worked instantly. It made me look at
                    myself and realize that in the past, I often assumed
                    teenagers understood me the first time. Watching the little
                    kids made me realize the value of breaking things down
                    step-by-step—which is actually super important for safety in
                    a STEM lab.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. GOAL */}
            <section className='mb-8 rounded-xl border border-slate-100 bg-white p-8 shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
              <div className='mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4 dark:border-neutral-700'>
                <Target
                  className='text-indigo-600 dark:text-indigo-400'
                  size={28}
                />
                <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
                  2. Goal - What do you want to achieve?
                </h2>
              </div>

              <div className='mb-8'>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  What new learning goals in terms of your teaching skills are
                  coming up?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    My new goal is to figure out how to adapt those primary
                    school management tricks for teenagers without treating them
                    like babies. I want to give instructions that are crystal
                    clear (like my friend does), but with a tone that works for
                    high schoolers. I think this really hits on being a better
                    Educator and Organizer.
                  </p>
                </div>
              </div>

              <div>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  If no new learning goal: which quality can you continue to
                  work on?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    I want to keep pushing myself as an Innovator. I'm thinking
                    about taking some of the English teaching games I saw—like
                    vocabulary roleplay—and seeing if I can twist them to
                    explain complex science concepts. It would be a fun way to
                    mix things up.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. RESOURCES + OPTIONS */}
            <section className='mb-8 rounded-xl border border-slate-100 bg-white p-8 shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
              <div className='mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4 dark:border-neutral-700'>
                <Lightbulb
                  className='text-indigo-600 dark:text-indigo-400'
                  size={28}
                />
                <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
                  3. Resources + Options
                </h2>
              </div>

              <div className='mb-8'>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  What feedback, both positive and constructive, came back
                  regularly?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    I was chatting with my friend after class, and she said
                    something that stuck with me: "If the students are confused,
                    it's usually the teacher's fault for not being clear." That
                    hit hard. It made me reflect on my own communication
                    (Metacognition).
                  </p>
                </div>
              </div>

              <div className='mb-8'>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  Can you link this feedback to your own established learning
                  objectives?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    Definitely. It goes right back to being a better Supervisor
                    of Learning. If I want to run a hands-on STEM lab, my
                    instructions need to be bulletproof so nobody breaks the
                    equipment or gets hurt.
                  </p>
                </div>
              </div>

              <div>
                <p className='mb-2 font-medium italic text-slate-500 dark:text-slate-400'>
                  Are there things you will take with you into the future?
                </p>
                <div className='border-l-4 border-indigo-500 py-1 pl-6'>
                  <p className='text-lg leading-relaxed text-slate-700 dark:text-slate-300'>
                    One simple thing: checking for understanding. My friend
                    makes the students repeat the instructions back to her
                    before they move. I'm definitely stealing that for my future
                    labs before I let students touch the equipment.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. WILL DO */}
            <section className='mb-12 rounded-xl border border-slate-100 bg-white p-8 shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
              <div className='mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4 dark:border-neutral-700'>
                <CheckSquare
                  className='text-indigo-600 dark:text-indigo-400'
                  size={28}
                />
                <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
                  4. Will Do - Action Plan
                </h2>
              </div>

              <div className='mb-2'>
                <p className='mb-4 font-medium italic text-slate-500 dark:text-slate-400'>
                  What concrete actions are you going to take now?
                </p>
                <ul className='space-y-4'>
                  <li className='flex items-start rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-neutral-600 dark:bg-neutral-700/50'>
                    <span className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                      1
                    </span>
                    <span className='text-lg text-slate-700 dark:text-slate-300'>
                      <strong>By next week</strong>, I'm going to sit down with
                      my friend and interview her about "transitions"—you know,
                      that chaotic moment when you switch from listening to
                      doing. I want to get at least 3 concrete tips from her.
                    </span>
                  </li>
                  <li className='flex items-start rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-neutral-600 dark:bg-neutral-700/50'>
                    <span className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                      2
                    </span>
                    <span className='text-lg text-slate-700 dark:text-slate-300'>
                      <strong>Within two weeks</strong>, I'm going to write up a
                      comparison list called "Primary vs. Secondary Management."
                      I want to list the strategies I saw her use, and then
                      write a column next to it figuring out how I'd modify that
                      for a high schooler.
                    </span>
                  </li>
                  <li className='flex items-start rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-neutral-600 dark:bg-neutral-700/50'>
                    <span className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                      3
                    </span>
                    <span className='text-lg text-slate-700 dark:text-slate-300'>
                      I'm going to find a video of a really good High School
                      STEM teacher online and compare it to my real-life
                      observation. I want to see the difference in voice, tone,
                      and pacing.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Print Button */}
            <div className='pb-12 text-center'>
              <button
                onClick={() => window.print()}
                className='mx-auto flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 font-bold text-white shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg dark:bg-indigo-500 dark:hover:bg-indigo-600'
              >
                <Upload size={20} />
                Save / Print for Submission
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
