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
      <div className='relative h-12 w-full rounded-xl bg-neutral-200 dark:bg-neutral-700' />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className='group relative flex h-12 w-full items-center justify-between overflow-hidden rounded-xl border-2 border-neutral-200 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 p-1.5 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:border-neutral-700 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 dark:hover:shadow-blue-900/50 dark:focus:ring-blue-400'
      data-umami-event={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient overlay */}
      <motion.div
        className='absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 dark:opacity-100'
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Light Mode Option */}
      <motion.div
        className='relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all duration-300'
        initial={false}
        animate={{
          backgroundColor: isDark ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
          color: isDark ? '#6b7280' : '#f59e0b',
        }}
      >
        <HiSun className='h-5 w-5' />
        <span className='text-sm font-medium'>Light</span>
      </motion.div>

      {/* Dark Mode Option */}
      <motion.div
        className='relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all duration-300'
        initial={false}
        animate={{
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'transparent',
          color: isDark ? '#60a5fa' : '#6b7280',
        }}
      >
        <HiMoon className='h-5 w-5' />
        <span className='text-sm font-medium'>Dark</span>
      </motion.div>

      {/* Animated indicator */}
      <motion.div
        className='absolute left-1.5 top-1.5 z-0 h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-lg bg-white shadow-md dark:bg-slate-800'
        initial={false}
        animate={{
          x: isDark ? 'calc(100% + 6px)' : 0,
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
