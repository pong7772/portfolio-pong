import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='relative h-8 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700 sm:h-9' />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className='group relative flex h-8 w-full items-center justify-between overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 p-1 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-md hover:shadow-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 dark:border-neutral-700 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 dark:hover:shadow-blue-900/50 dark:focus:ring-blue-400 sm:h-9 sm:p-1.5'
      data-umami-event={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient overlay */}
      <motion.div
        className='absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 dark:opacity-100'
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Light Mode Option */}
      <motion.div
        className='relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 transition-all duration-300 sm:gap-2 sm:px-3 sm:py-1.5'
        initial={false}
        animate={{
          backgroundColor: isDark ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
          color: isDark ? '#6b7280' : '#f59e0b',
        }}
      >
        <HiSun className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        <span className='text-xs font-medium sm:text-sm'>Light</span>
      </motion.div>

      {/* Dark Mode Option */}
      <motion.div
        className='relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 transition-all duration-300 sm:gap-2 sm:px-3 sm:py-1.5'
        initial={false}
        animate={{
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'transparent',
          color: isDark ? '#60a5fa' : '#6b7280',
        }}
      >
        <HiMoon className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        <span className='text-xs font-medium sm:text-sm'>Dark</span>
      </motion.div>

      {/* Animated indicator */}
      <motion.div
        className='absolute left-1 top-1 z-0 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-md bg-white shadow-sm dark:bg-slate-800 sm:left-1.5 sm:top-1.5 sm:h-[calc(100%-12px)] sm:w-[calc(50%-6px)]'
        initial={false}
        animate={{
          x: isDark ? 'calc(100% + 4px)' : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
};

export default ThemeSwitcher;
