import { MenuItemProps } from '@/common/types/menu';

import MenuItem from './MenuItem';

type MenuProps = {
  title?: string;
  list: MenuItemProps[];
};

const Menu = ({ title, list }: MenuProps) => {
  return (
    <div className='flex flex-col space-y-1'>
      {title && (
        <div className='mb-2 ml-2 mt-1 hidden text-xs text-neutral-600 dark:text-neutral-500 sm:text-sm lg:block'>
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
