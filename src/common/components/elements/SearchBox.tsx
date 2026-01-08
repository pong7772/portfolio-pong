import { useContext } from 'react';
import { BiCommand as CommandIcon } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';

import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';

const SearchBox = () => {
  const { setIsOpen } = useContext(CommandPaletteContext);

  const handleOpenCommandPalette = () => setIsOpen(true);

  return (
    <div
      onClick={() => handleOpenCommandPalette()}
      className='flex items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-neutral-500 backdrop-blur transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-100 active:scale-[0.98] dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 sm:py-3'
    >
      <FiSearch size={20} className='flex-shrink-0 sm:h-5 sm:w-5' />
      <span className='w-full text-sm font-medium hover:cursor-text sm:text-base'>
        Search
      </span>
      <div className='flex items-center gap-1 rounded-md bg-neutral-200 px-1.5 py-1 text-[10px] font-medium dark:bg-neutral-800 sm:text-xs'>
        <CommandIcon className='mt-0.5' size={12} />
        <span>k</span>
      </div>
    </div>
  );
};

export default SearchBox;
