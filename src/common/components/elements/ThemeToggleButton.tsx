import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='relative h-11 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700' />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className='group relative flex h-11 w-20 items-center rounded-full border-2 border-neutral-300 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 p-1 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:border-neutral-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 dark:hover:shadow-blue-400/50 dark:focus:ring-blue-400'
      data-umami-event={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient overlay for smooth transition */}
      <motion.div
        className='absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 dark:opacity-100'
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Toggle circle */}
      <motion.div
        className='relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-all duration-500 group-hover:ring-4 group-hover:ring-yellow-200 dark:bg-neutral-800 dark:group-hover:ring-blue-200'
        initial={false}
        animate={{
          x: isDark ? 0 : 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icons */}
        <motion.div
          className='absolute'
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <HiMoon className='h-5 w-5 text-indigo-600 dark:text-blue-300' />
        </motion.div>
        <motion.div
          className='absolute'
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <HiSun className='h-5 w-5 text-yellow-500' />
        </motion.div>
      </motion.div>

      {/* Sparkle effect on hover */}
      <motion.div
        className='absolute inset-0 rounded-full'
        initial={false}
        whileHover={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
          ],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </button>
  );
};

export default ThemeToggleButton;
