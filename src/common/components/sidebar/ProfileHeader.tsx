import clsx from 'clsx';
import Link from 'next/link';
import { MdVerified as VerifiedIcon } from 'react-icons/md';

import Image from '../elements/Image';

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
  isScrolled?: boolean;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-grow items-center gap-2 sm:gap-3 lg:flex-col lg:items-start lg:gap-0.5 lg:px-2',
        expandMenu && 'flex-row !items-center gap-2',
      )}
    >
      <div
        className={clsx(
          'flex-shrink-0',
          expandMenu
            ? 'w-8 sm:w-10'
            : 'w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-none',
        )}
      >
        <Image
          src='/images/pongpf.png'
          alt='Visothipong'
          width={expandMenu ? 32 : imageSize}
          height={expandMenu ? 32 : imageSize}
          rounded={expandMenu ? 'rounded-full' : 'rounded-[16px]'}
          className={clsx(
            'h-auto rotate-3 transition-transform duration-300 dark:border-neutral-600',
            expandMenu ? 'w-8 sm:w-10' : 'w-full',
            !expandMenu && 'hover:scale-105',
          )}
        />
      </div>
      <div className={expandMenu ? 'flex-1' : ''}>
        <div
          className={clsx(
            'flex items-center gap-1 sm:gap-2',
            expandMenu ? 'mt-0' : 'mt-1 lg:mt-3',
          )}
        >
          <Link href='/' passHref>
            <h2
              className={clsx(
                'font-medium',
                expandMenu
                  ? 'text-xs sm:text-sm'
                  : 'text-sm sm:text-base md:text-lg lg:text-xl',
              )}
            >
              Roth Visothipong
            </h2>
          </Link>
          <VerifiedIcon size={expandMenu ? 14 : 16} className='text-blue-400' />
        </div>
        <div
          className={clsx(
            'text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400',
            expandMenu
              ? 'text-[10px] sm:text-xs'
              : 'hidden text-xs sm:text-sm md:text-[15px] lg:flex',
          )}
        >
          @pong7772
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
