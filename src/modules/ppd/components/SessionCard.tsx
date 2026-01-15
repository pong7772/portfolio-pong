import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight as MoreIcon } from 'react-icons/bs';
import { BiFileBlank } from 'react-icons/bi';

import Card from '@/common/components/elements/Card';

interface SessionCardProps {
  title: string;
  description: string;
  author: string;
  subtitle: string;
  href: string;
}

const SessionCard = ({
  title,
  description,
  author,
  subtitle,
  href,
}: SessionCardProps) => {
  return (
    <Link href={href} className='h-full'>
      <Card className='group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700'>
        {/* Icon Section */}
        <div className='relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30'>
          <div className='flex h-full items-center justify-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 dark:bg-indigo-400/20'>
              <BiFileBlank
                className='h-8 w-8 text-indigo-600 dark:text-indigo-400'
                size={32}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='flex flex-1 flex-col p-5'>
          {/* Title */}
          <h3 className='mb-3 line-clamp-2 text-lg font-semibold leading-tight text-neutral-800 transition-colors group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400'>
            {title}
          </h3>

          {/* Description */}
          <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
            {description}
          </p>

          {/* Author and Subtitle */}
          <div className='mb-4 space-y-1'>
            <p className='text-xs font-semibold text-indigo-600 dark:text-indigo-400'>
              {author}
            </p>
            <p className='text-xs text-neutral-500 dark:text-neutral-500'>
              {subtitle}
            </p>
          </div>

          {/* Read More Button */}
          <div className='mt-auto flex items-center justify-end border-t border-neutral-200 pt-4 dark:border-neutral-800'>
            <motion.div
              className='flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400'
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>View</span>
              <MoreIcon size={16} />
            </motion.div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SessionCard;
