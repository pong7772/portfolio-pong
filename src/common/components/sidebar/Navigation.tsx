import { MENU_APPS, MENU_ITEMS } from '@/common/constant/menu';

import Menu from './Menu';
import Breakline from '../elements/Breakline';

const Navigation = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  const filteredAppsMenu = MENU_APPS?.filter((item) => item?.isShow);

  return (
    <>
      <Menu list={filteredMenu} />
      <Breakline className='mx-1 my-1.5 sm:my-2' />
      <div className='space-y-1'>
        <div className='px-2 sm:px-3 md:px-4'>
          <span className='text-[9px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:text-[10px] md:text-xs'>
            Apps
          </span>
        </div>
        <Menu list={filteredAppsMenu} />
      </div>
    </>
  );
};

export default Navigation;
