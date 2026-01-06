import Sidebar from '../partials/Sidebar';

const HeaderSidebar = () => {
  return (
    <header className='w-full md:w-1/5 md:min-w-[200px] lg:min-w-[200px] xl:min-w-[240px]'>
      <Sidebar />
    </header>
  );
};

export default HeaderSidebar;
