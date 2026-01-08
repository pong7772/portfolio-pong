import { MenuItemProps } from '@/common/types/menu';

import MenuItem from './MenuItem';

type MenuProps = {
  title?: string;
  list: MenuItemProps[];
};

const Menu = ({ title, list }: MenuProps) => {
  return (
    <div className='flex flex-col space-y-1 sm:space-y-1.5'>
      {title && (
        <div className='mb-2 ml-1 mt-1 hidden text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:mb-2.5 sm:ml-2 sm:text-xs md:text-sm lg:block'>
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
