import { motion } from 'framer-motion';
import {
  BsPauseFill as PauseIcon,
  BsPlayFill as PlayIcon,
} from 'react-icons/bs';
import { HiOutlineMusicNote } from 'react-icons/hi';

import { useMusic } from '@/common/context/MusicContext';

const BackgroundAudioButton = () => {
  const { isPlaying, isEnabled, toggle, enable } = useMusic();

  const handleClick = () => {
    if (!isEnabled) {
      enable();
    } else {
      toggle();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className='group relative flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1.5 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 dark:border-neutral-600 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 dark:hover:shadow-pink-600/50 dark:focus:ring-pink-500 sm:h-8 sm:w-8 sm:p-2'
      aria-label={
        isPlaying ? 'Pause background music' : 'Play background music'
      }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background pulse when playing */}
      {isPlaying && (
        <motion.div
          className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Icon container */}
      <motion.div
        className='relative z-10 flex items-center justify-center'
        animate={{
          rotate: isPlaying ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      >
        {!isEnabled ? (
          <HiOutlineMusicNote className='h-3.5 w-3.5 text-white sm:h-4 sm:w-4' />
        ) : isPlaying ? (
          <PauseIcon className='h-3.5 w-3.5 text-white sm:h-4 sm:w-4' />
        ) : (
          <PlayIcon className='h-3.5 w-3.5 text-white sm:h-4 sm:w-4' />
        )}
      </motion.div>

      {/* Tooltip text (hidden on mobile, shown on hover for desktop) */}
      <span className='pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900 sm:block'>
        {!isEnabled ? 'Enable music' : isPlaying ? 'Pause music' : 'Play music'}
      </span>
    </motion.button>
  );
};

export default BackgroundAudioButton;
