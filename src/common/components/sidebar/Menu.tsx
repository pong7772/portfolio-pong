import { MenuItemProps } from '@/common/types/menu';

import MenuItem from './MenuItem';

type MenuProps = {
  title?: string;
  list: MenuItemProps[];
};

const Menu = ({ title, list }: MenuProps) => {
  return (
    <div className='flex flex-col space-y-0.5 sm:space-y-1'>
      {title && (
        <div className='mb-1.5 ml-1 mt-1 hidden text-[9px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:mb-2 sm:ml-2 sm:text-[10px] md:text-xs lg:block'>
          {title}
        </div>
      )}
      {list?.map((item: MenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Menu;
