import clsx from 'clsx';

import Image from '@/common/components/elements/Image';
import { formatDate } from '@/common/helpers';
import { Comment } from '@/common/types/comment';

type CommentItemProps = Comment;

const CommentItem = ({
  name,
  email,
  message,
  image,
  admin_reply,
  replied_at,
  created_at,
}: CommentItemProps) => {
  const getInitials = (value: string) => {
    return value
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='space-y-4 break-all dark:text-neutral-400'>
      {/* User Comment */}
      <div className='flex gap-4'>
        <div className='flex-shrink-0'>
          {image ? (
            <Image
              src={image}
              alt={name}
              width={40}
              height={40}
              rounded='rounded-full'
              className='border border-neutral-200 dark:border-neutral-800'
            />
          ) : (
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white dark:border-neutral-700'>
              {getInitials(name || email)}
            </div>
          )}
        </div>
        <div className='flex w-full flex-col gap-2 rounded-md border border-neutral-300 px-4 py-3 text-sm dark:border-neutral-700'>
          <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-0.5'>
              <div className='font-medium text-neutral-900 dark:text-neutral-200'>
                {name}
              </div>
              <div className='text-xs text-neutral-500 dark:text-neutral-500'>
                {email}
              </div>
            </div>
            <div className='text-xs text-neutral-500 dark:text-neutral-500'>
              {formatDate(created_at, 'MMM dd, yyyy, HH:mm')}
            </div>
          </div>
          <p
            className={clsx(
              'whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300',
            )}
          >
            {message}
          </p>
        </div>
      </div>

      {/* Admin Reply */}
      {admin_reply && (
        <div className='ml-14 flex gap-4'>
          <div className='flex-shrink-0'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-semibold text-white dark:border-neutral-700'>
              👤
            </div>
          </div>
          <div className='flex w-full flex-col gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm dark:border-green-700 dark:bg-green-900/20'>
            <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-2'>
                <div className='font-medium text-green-900 dark:text-green-200'>
                  Admin Reply
                </div>
                {replied_at && (
                  <div className='text-xs text-green-600 dark:text-green-400'>
                    {formatDate(replied_at, 'MMM dd, yyyy, HH:mm')}
                  </div>
                )}
              </div>
            </div>
            <p
              className={clsx(
                'whitespace-pre-wrap text-sm leading-relaxed text-green-800 dark:text-green-200',
              )}
            >
              {admin_reply}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
