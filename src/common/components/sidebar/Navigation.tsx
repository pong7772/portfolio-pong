import { MENU_APPS, MENU_ITEMS } from '@/common/constant/menu';

import Menu from './Menu';
import Breakline from '../elements/Breakline';

const Navigation = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  const filteredAppsMenu = MENU_APPS?.filter((item) => item?.isShow);

  return (
    <>
      <Menu list={filteredMenu} />
      <Breakline className='mx-1' />
      <div className='space-y-1'>
        <div className='px-2 sm:px-3 md:px-4'>
          <span className='text-[10px] text-neutral-600 dark:text-neutral-400 sm:text-xs md:text-sm'>
            Apps
          </span>
        </div>
        <Menu list={filteredAppsMenu} />
      </div>
    </>
  );
};

export default Navigation;
