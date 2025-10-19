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
        'flex w-full flex-grow items-center gap-4 lg:flex-col lg:items-start lg:gap-0.5 lg:px-2',
        expandMenu && 'flex-row !items-center',
      )}
    >
      <div
        className={clsx(
          'flex-shrink-0',
          expandMenu
            ? 'w-10 sm:w-12'
            : 'w-full max-w-[200px] sm:max-w-[250px] lg:max-w-none',
        )}
      >
        <Image
          src='/images/pongpf.png'
          alt='Visothipong'
          width={expandMenu ? 48 : imageSize}
          height={expandMenu ? 48 : imageSize}
          rounded={expandMenu ? 'rounded-full' : 'rounded-[20px]'}
          className={clsx(
            'h-auto rotate-3 transition-transform duration-300 dark:border-neutral-600',
            expandMenu ? 'w-10 sm:w-12' : 'w-full',
            !expandMenu && 'hover:scale-105',
          )}
        />
      </div>
      <div className={expandMenu ? 'flex-1' : ''}>
        <div
          className={clsx(
            'flex items-center gap-2',
            expandMenu ? 'mt-0' : 'mt-1 lg:mt-4',
          )}
        >
          <Link href='/' passHref>
            <h2
              className={clsx(
                'font-medium',
                expandMenu
                  ? 'text-sm sm:text-base'
                  : 'text-base sm:text-lg lg:text-xl',
              )}
            >
              Roth Visothipong
            </h2>
          </Link>
          <VerifiedIcon size={18} className='text-blue-400' />
        </div>
        <div
          className={clsx(
            'text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400',
            expandMenu
              ? 'text-xs sm:text-sm'
              : 'hidden text-sm sm:text-[15px] lg:flex',
          )}
        >
          @pong7772
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
