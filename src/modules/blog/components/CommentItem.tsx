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
    <div className='flex gap-4 break-all dark:text-neutral-400'>
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
  );
};

export default CommentItem;
