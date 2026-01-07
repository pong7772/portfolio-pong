import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { BiArrowBack } from 'react-icons/bi';

import Button from '@/common/components/elements/Button';
import Container from '@/common/components/elements/Container';
import HtmlContent from '@/common/components/elements/HtmlContent';
import ImageGallery from '@/common/components/elements/ImageGallery';
import prisma from '@/common/libs/prisma';
import { Story } from '@/common/types/stories';

interface StoryDetailPageProps {
  story: Story | null;
}

const StoryDetailPage: NextPage<StoryDetailPageProps> = ({ story }) => {
  const router = useRouter();

  if (!story) {
    return (
      <>
        <NextSeo title='Story Not Found - Visothipong' />
        <Container>
          <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4'>
            <h1 className='text-2xl font-bold'>Story Not Found</h1>
            <p className='text-neutral-600 dark:text-neutral-400'>
              The story you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`${story.title} - Visothipong`}
        description={story.description || 'Photo story by Roth Visothipong'}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/stories/${story.id}`}
        openGraph={{
          type: 'article',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/stories/${story.id}`,
          title: `${story.title} - Visothipong`,
          description: story.description || 'Photo story by Roth Visothipong',
          images: [
            {
              url: story.image,
              width: 1200,
              height: 630,
              alt: story.title,
            },
          ],
          siteName: 'Visothipong Portfolio',
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@visothipong',
          site: '@visothipong',
        }}
      />
      <Container>
        <div className='space-y-6'>
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
          >
            <BiArrowBack size={20} />
            <span>Back</span>
          </button>

          {/* Story content */}
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold lg:text-4xl'>{story.title}</h1>

            {/* Story images gallery */}
            <ImageGallery
              images={story.images ? JSON.parse(story.images) : []}
              featuredImage={story.image}
              title={story.title}
            />

            {/* Story description */}
            {story.description && (
              <>
                {story.description.trim().startsWith('<') ? (
                  <HtmlContent content={story.description} />
                ) : (
                  <div className='prose prose-lg max-w-none'>
                    <p className='text-lg leading-relaxed text-neutral-700 dark:text-neutral-300'>
                      {story.description}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Story metadata */}
            <div className='flex items-center gap-4 border-t border-neutral-200 pt-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400'>
              <span>
                Posted on{' '}
                {new Date(story.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  if (!id || Array.isArray(id)) {
    return {
      props: {
        story: null,
      },
    };
  }

  try {
    const story = await prisma.stories.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!story || !story.is_show) {
      return {
        props: {
          story: null,
        },
      };
    }

    return {
      props: {
        story: JSON.parse(JSON.stringify(story)),
      },
    };
  } catch (error) {
    console.error('Error fetching story:', error);
    return {
      props: {
        story: null,
      },
    };
  }
};

export default StoryDetailPage;
