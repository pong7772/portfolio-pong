import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { BsArrowRightShort as ExternalLinkIcon } from 'react-icons/bs';

import { MenuContext } from '@/common/context/MenuContext';
import { MenuItemProps } from '@/common/types/menu';

const MenuItem = ({
  title,
  href,
  icon,
  onClick,
  className = '',
  children,
  hideIcon = false,
}: MenuItemProps) => {
  const { hideNavbar } = useContext(MenuContext);
  const [isHovered, setIsHovered] = useState(false);
  const isExternalUrl = href?.includes('http');
  const isHashLink = href === '#';
  const router = useRouter();

  const activeClasses = `flex items-center gap-1.5 py-1.5 pl-2.5 pr-2 text-xs sm:gap-2 sm:py-2 sm:pl-3 sm:pr-2.5 sm:text-sm md:pl-3 md:pr-2 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300 rounded-md group transition-all duration-200 active:scale-[0.98] ${
    router.pathname === href
      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:!text-neutral-200 font-medium'
      : 'hover:bg-neutral-100 hover:dark:bg-neutral-800/50 hover:dark:!text-neutral-300 active:bg-neutral-200 active:dark:bg-neutral-800'
  }`;

  const handleClick = () => {
    hideNavbar();
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const elementProps = {
    className: `${activeClasses} ${className}`,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const isActiveRoute = router.pathname === href;

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        {!hideIcon && (
          <div
            className={clsx(
              'flex-shrink-0 transition-all duration-300 group-hover:-rotate-12',
              isActiveRoute && 'animate-pulse',
            )}
          >
            {icon}
          </div>
        )}
        <div className='flex-grow truncate'>{title}</div>
        {children && <>{children}</>}
        {isActiveRoute && (
          <ExternalLinkIcon
            size={16}
            className='sm:size-4 ml-1 animate-pulse text-gray-500'
          />
        )}
        {isExternalUrl && isHovered && (
          <ExternalLinkIcon
            size={16}
            className='sm:size-4 -rotate-45 text-gray-500 lg:transition-all lg:duration-300'
          />
        )}
      </div>
    );
  };

  return isHashLink ? (
    <div className='cursor-pointer'>{itemComponent()}</div>
  ) : (
    <Link
      href={href}
      target={isExternalUrl ? '_blank' : ''}
      onClick={handleClick}
    >
      {itemComponent()}
    </Link>
  );
};

export default MenuItem;
