import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import StructuredData from '@/common/components/elements/StructuredData';
import { formatExcerpt } from '@/common/helpers';
import { PPDPostDetailProps } from '@/common/types/ppd';
import { PPDDetail } from '@/modules/ppd';
import CommentList from '@/modules/blog/components/CommentList';
import { fetcher } from '@/services/fetcher';

interface PPDDetailPageProps {
  post: {
    data: PPDPostDetailProps;
  };
}

const PPDDetailPage: NextPage<PPDDetailPageProps> = ({ post }) => {
  const postData = post?.data || {};

  const slug = `ppd/${postData?.slug}`;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
  const canonicalUrl = `${baseUrl}/pxl/personal-professional-development/${postData?.slug}`;
  const description =
    formatExcerpt(postData?.excerpt?.rendered) ||
    'Read this personal and professional development post by Roth Visothipong.';

  const incrementViews = async () => {
    await axios.post(`/api/views?slug=${postData?.slug}&type=ppd`);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      incrementViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title={`${postData?.title?.rendered} - Personal & Professional Development`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: postData?.date,
            modifiedTime: postData?.modified || postData?.date,
            authors: ['Roth Visothipong'],
            tags: postData?.tags_list?.map((tag) => tag.name) || [],
          },
          url: canonicalUrl,
          title: postData?.title?.rendered,
          description: description,
          images:
            postData?.thumbnail_url || postData?.featured_image_url
              ? [
                  {
                    url:
                      postData.thumbnail_url ||
                      postData.featured_image_url ||
                      '',
                    width: 1200,
                    height: 630,
                    alt: postData?.title?.rendered,
                  },
                ]
              : [
                  {
                    url: `${baseUrl}/images/pongpf.png`,
                    width: 1200,
                    height: 630,
                    alt: postData?.title?.rendered,
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
      <StructuredData
        type='BlogPosting'
        data={{
          title: postData?.title?.rendered,
          description: description,
          excerpt: formatExcerpt(postData?.excerpt?.rendered),
          image: postData?.thumbnail_url || postData?.featured_image_url || '',
          publishedTime: postData?.date,
          modifiedTime: postData?.modified || postData?.date,
          url: canonicalUrl,
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/pxl/personal-professional-development' />
        <PPDDetail {...postData} />
        <section id='comments'>
          <CommentList slug={slug} type='ppd' />
        </section>
      </Container>
    </>
  );
};

export default PPDDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.query?.id as string;
  const postSlug = context.query?.slug as string;

  if (!postId && !postSlug) {
    return {
      redirect: {
        destination: '/pxl/personal-professional-development',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetcher(
      `/api/ppd-posts?${postId ? `id=${postId}` : `slug=${postSlug}`}`,
    );

    if (response?.status === false || !response?.data) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    return {
      props: {
        post: response,
      },
    };
  } catch (error) {
    console.error('Error fetching PPD post:', error);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};
