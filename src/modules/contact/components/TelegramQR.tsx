import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaTelegramPlane as TelegramIcon } from 'react-icons/fa';

const TelegramQR = () => {
  const telegramUsername = '@THIPONG_ROTH';
  const telegramUrl = 'https://t.me/THIPONG_ROTH';
  const [imageError, setImageError] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center space-y-6 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='space-y-2 text-center'>
        <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
          Connect on Telegram
        </h3>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Scan the QR code or click to open Telegram
        </p>
      </div>

      <div className='relative'>
        {/* QR Code Container */}
        <div className='relative rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-800'>
          <div className='relative mx-auto h-64 w-64'>
            {!imageError ? (
              <Image
                src='/images/telegram-qr.png'
                alt='Telegram QR Code'
                fill
                className='rounded-lg object-contain'
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700'>
                <div className='p-4 text-center'>
                  <div className='mx-auto mb-2 flex h-32 w-32 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-600'>
                    <TelegramIcon className='text-4xl text-neutral-400' />
                  </div>
                  <p className='text-xs text-neutral-500'>
                    Add telegram-qr.png to /public/images/
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Username and Link */}
      <div className='flex flex-col items-center space-y-3'>
        <div className='flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800'>
          <TelegramIcon className='text-xl text-blue-500' />
          <span className='font-medium text-neutral-800 dark:text-neutral-200'>
            {telegramUsername}
          </span>
        </div>

        <Link
          href={telegramUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow-lg'
        >
          <TelegramIcon className='text-lg' />
          <span>Open in Telegram</span>
        </Link>
      </div>
    </div>
  );
};

export default TelegramQR;
