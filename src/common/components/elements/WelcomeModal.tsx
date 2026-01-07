import { useEffect, useState } from 'react';
import { HiOutlineMusicNote as MusicIcon } from 'react-icons/hi';
import { HiOutlineX as CloseIcon } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  onMusicChoice: (enableMusic: boolean) => void;
}

const WelcomeModal = ({ onMusicChoice }: WelcomeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (enableMusic: boolean) => {
    localStorage.setItem('hasSeenWelcome', 'true');
    localStorage.setItem('musicEnabled', enableMusic.toString());
    setIsOpen(false);
    onMusicChoice(enableMusic);
  };

  const handleClose = () => {
    // If user closes without choosing, default to no music
    localStorage.setItem('hasSeenWelcome', 'true');
    localStorage.setItem('musicEnabled', 'false');
    setIsOpen(false);
    onMusicChoice(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={handleClose}
          />

          {/* Modal - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='relative z-[10000] w-[90%] max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className='absolute right-4 top-4 rounded-lg p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300'
              aria-label='Close modal'
            >
              <CloseIcon size={20} />
            </button>

            <div className='space-y-6 text-center'>
              {/* Welcome Message */}
              <div className='space-y-2'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl'
                >
                  👋
                </motion.div>
                <h2 className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
                  Welcome to Visothipong&apos;s Portfolio!
                </h2>
                <p className='text-neutral-600 dark:text-neutral-400'>
                  I&apos;m excited to have you here. Would you like to enhance
                  your experience with background music?
                </p>
              </div>

              {/* Choice Buttons */}
              <div className='flex flex-col gap-3 sm:flex-row'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(true)}
                  className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl'
                >
                  <MusicIcon size={20} />
                  <span>Yes, Play Music</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(false)}
                  className='flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 bg-white px-6 py-4 font-semibold text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                >
                  <span>No, Visit Quietly</span>
                </motion.button>
              </div>

              <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                You can change this preference anytime
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
