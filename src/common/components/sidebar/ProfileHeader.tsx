import clsx from 'clsx';
import Link from 'next/link';
import { MdVerified as VerifiedIcon } from 'react-icons/md';

import Image from '../elements/Image';

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
  isScrolled?: boolean;
}

const ProfileHeader = ({
  expandMenu,
  imageSize,
  isScrolled,
}: ProfileHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-grow items-center gap-1.5 sm:gap-2 md:flex-col md:items-start md:gap-0.5 md:px-2',
        expandMenu && 'flex-row !items-center gap-1.5 sm:gap-2',
      )}
    >
      <div
        className={clsx(
          'flex-shrink-0',
          expandMenu
            ? 'w-6 sm:w-8 md:w-10'
            : isScrolled
              ? 'w-10 sm:w-12 md:w-14'
              : 'xs:max-w-[100px] w-full max-w-[80px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] xl:max-w-[180px] 2xl:max-w-none',
        )}
      >
        <Image
          src='/images/pongpf.png'
          alt='Visothipong'
          width={expandMenu ? 24 : imageSize}
          height={expandMenu ? 24 : imageSize}
          rounded={expandMenu ? 'rounded-full' : 'rounded-[12px]'}
          className={clsx(
            'h-auto rotate-3 transition-transform duration-300 dark:border-neutral-600',
            expandMenu
              ? 'w-6 sm:w-8 md:w-10'
              : isScrolled
                ? 'w-10 sm:w-12 md:w-14'
                : 'w-full',
            !expandMenu && 'hover:scale-105',
          )}
          priority={!expandMenu}
          quality={100}
          sizes={
            expandMenu
              ? '32px'
              : isScrolled
                ? '(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px'
                : '(max-width: 640px) 80px, (max-width: 768px) 100px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 160px'
          }
        />
      </div>
      <div className={expandMenu ? 'flex-1' : ''}>
        <div
          className={clsx(
            'flex items-center gap-1 sm:gap-2',
            expandMenu ? 'mt-0' : 'mt-1 md:mt-2 lg:mt-3',
          )}
        >
          <Link href='/' passHref>
            <h2
              className={clsx(
                'font-medium',
                expandMenu
                  ? 'text-[10px] sm:text-xs md:text-sm'
                  : 'xs:text-sm text-xs sm:text-base md:text-base lg:text-lg xl:text-xl',
              )}
            >
              Roth Visothipong
            </h2>
          </Link>
          <VerifiedIcon size={expandMenu ? 10 : 14} className='text-blue-400' />
        </div>
        <div
          className={clsx(
            'text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400',
            expandMenu
              ? 'text-[8px] sm:text-[10px] md:text-xs'
              : 'xs:text-xs hidden text-[10px] sm:text-sm md:text-[15px] lg:flex',
          )}
        >
          @pong7772
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
