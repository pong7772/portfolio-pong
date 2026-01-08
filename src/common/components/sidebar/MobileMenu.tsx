import { motion } from 'framer-motion';
import { FC } from 'react';

import Navigation from './Navigation';

const MobileMenu: FC = () => {
  return (
    <motion.div
      className='mb-4 mt-3 flex max-h-[calc(100vh-180px)] flex-col overflow-y-auto overflow-x-hidden sm:mb-6 sm:mt-4'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
      }}
    >
      <div className='-mx-1 px-1'>
        <Navigation />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
