import { motion } from 'framer-motion';
import { FC } from 'react';

import Navigation from './Navigation';

const MobileMenu: FC = () => {
  return (
    <motion.div
      className='mb-4 mt-2 flex max-h-[calc(100vh-200px)] flex-col overflow-y-auto sm:mb-6 sm:mt-3'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Navigation />
    </motion.div>
  );
};

export default MobileMenu;
