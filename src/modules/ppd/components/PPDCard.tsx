import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight as MoreIcon } from 'react-icons/bs';
import { FaRegEye as ViewIcon } from 'react-icons/fa';
import { HiOutlineClock as ClockIcon } from 'react-icons/hi';
import { TbCalendarBolt as DateIcon } from 'react-icons/tb';

import Card from '@/common/components/elements/Card';
import Image from '@/common/components/elements/Image';
import {
  calculateReadingTime,
  formatDate,
  formatExcerpt,
} from '@/common/helpers';
import { PPDPostItemProps } from '@/common/types/ppd';

interface PPDCardProps extends PPDPostItemProps {
  isExcerpt?: boolean;
}

const PPDCard = ({
  id,
  title,
  thumbnail_url,
  date,
  slug,
  content,
  excerpt,
  total_views_count,
  tags_list,
  isExcerpt = true,
}: PPDCardProps) => {
  const readingTimeMinutes = calculateReadingTime(content?.rendered) ?? 0;
  const tagList = tags_list || [];
  const defaultImage = '/images/placeholder.png';

  return (
    <Link
      href={`/pxl/personal-professional-development/${slug}?id=${id}`}
      className='h-full'
    >
      <Card className='group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700'>
        {/* Thumbnail/Banner Section */}
        <div className='relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800'>
          <Image
            src={thumbnail_url || defaultImage}
            alt={title?.rendered || 'PPD Post'}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110'
            priority
          />
          {/* Gradient overlay for tags */}
          {tagList.length > 0 && (
            <div className='absolute left-0 top-0 flex flex-wrap gap-2 p-4'>
              {tagList.slice(0, 2).map((tag) => (
                <span
                  key={tag?.term_id}
                  className='rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/90 dark:text-neutral-300'
                >
                  #{tag?.name.charAt(0).toUpperCase() + tag?.name.slice(1)}
                </span>
              ))}
              {tagList.length > 2 && (
                <span className='rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/90 dark:text-neutral-300'>
                  +{tagList.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className='flex flex-1 flex-col p-5'>
          {/* Title */}
          <h3 className='mb-3 line-clamp-2 text-lg font-semibold leading-tight text-neutral-800 transition-colors group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400'>
            {title?.rendered}
          </h3>

          {/* Excerpt */}
          <div className='mb-4 min-h-[2.5rem]'>
            {isExcerpt && excerpt?.rendered && (
              <p className='line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
                {formatExcerpt(excerpt.rendered)}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className='mt-auto flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800'>
            <div className='flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400'>
              <div className='flex items-center gap-1.5'>
                <DateIcon size={14} className='text-neutral-400' />
                <span>{formatDate(date)}</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <ClockIcon size={14} className='text-neutral-400' />
                <span>{readingTimeMinutes} min</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <ViewIcon size={14} className='text-neutral-400' />
                <span>{total_views_count.toLocaleString()}</span>
              </div>
            </div>

            {/* Read More Button */}
            <motion.div
              className='flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400'
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>Read</span>
              <MoreIcon size={16} />
            </motion.div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PPDCard;
