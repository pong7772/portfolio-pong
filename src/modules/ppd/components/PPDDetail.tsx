import useSWR from 'swr';

import Breakline from '@/common/components/elements/Breakline';
import HtmlContent from '@/common/components/elements/HtmlContent';
import ImageGallery from '@/common/components/elements/ImageGallery';
import MDXComponent from '@/common/components/elements/MDXComponent';
import YouTubeEmbed from '@/common/components/elements/YouTubeEmbed';
import { calculateReadingTime } from '@/common/helpers';
import { PPDPostDetailProps } from '@/common/types/ppd';
import { fetcher } from '@/services/fetcher';

import BlogHeader from '@/modules/blog/components/BlogHeader';

const PPDDetail = ({
  id,
  title,
  date,
  slug,
  content,
  tags_list,
  featured_image_url,
  thumbnail_url,
  images,
  youtube_video_url,
}: PPDPostDetailProps) => {
  const { data: viewsData } = useSWR(
    `/api/views?slug=${slug}&id=${id}`,
    fetcher,
  );

  const viewsCount = viewsData?.views || 0;
  const tagList = tags_list || [];

  const readingTimeMinutes = calculateReadingTime(content?.rendered) ?? 0;

  // Combine thumbnail and featured image with additional images
  const allImages = [
    ...(thumbnail_url ? [thumbnail_url] : []),
    ...(featured_image_url && featured_image_url !== thumbnail_url
      ? [featured_image_url]
      : []),
    ...(images || []),
  ].filter(Boolean);

  return (
    <>
      <BlogHeader
        title={title?.rendered}
        comments_count={0}
        reading_time_minutes={readingTimeMinutes}
        published_at={date}
        page_views_count={viewsCount}
      />

      {/* Image Gallery */}
      {allImages.length > 0 && (
        <ImageGallery
          images={images || []}
          featuredImage={thumbnail_url || featured_image_url || undefined}
          title={title?.rendered}
        />
      )}

      {/* YouTube Video */}
      {youtube_video_url && (
        <YouTubeEmbed url={youtube_video_url} title={title?.rendered} />
      )}

      {/* Content */}
      <div className='mt-6'>
        {content?.rendered && (
          <>
            {/* Check if content is HTML (starts with <) or Markdown */}
            {content.rendered.trim().startsWith('<') ? (
              <HtmlContent content={content.rendered} />
            ) : (
              <div className='space-y-6 leading-[1.8] dark:text-neutral-300'>
                <MDXComponent>
                  {content?.markdown || content?.rendered}
                </MDXComponent>
              </div>
            )}
          </>
        )}
      </div>

      {/* Tags */}
      {tagList?.length >= 1 && (
        <div className='my-10 space-y-2'>
          <h6 className='text-lg font-medium'>Tags:</h6>
          <div className='flex flex-wrap gap-2 pt-2'>
            {tagList?.map((tag) => (
              <div
                key={tag?.term_id}
                className='rounded-full bg-neutral-200 px-4 py-1 text-[14px] font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200'
              >
                <span className='mr-1 font-semibold'>#</span>
                {tag?.name.charAt(0).toUpperCase() + tag?.name.slice(1)}
              </div>
            ))}
          </div>
        </div>
      )}
      <Breakline className='!my-10' />
    </>
  );
};

export default PPDDetail;
