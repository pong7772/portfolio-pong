import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import StructuredData from '@/common/components/elements/StructuredData';
import { formatExcerpt } from '@/common/helpers';
import prisma from '@/common/libs/prisma';
import { PPDPostDetailProps } from '@/common/types/ppd';
import { PPDDetail } from '@/modules/ppd';
import CommentList from '@/modules/blog/components/CommentList';

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

// Transform database PPD post to WordPress-like format
const transformPPDPostToWordPressFormat = (
  post: any,
  views = 0,
): PPDPostDetailProps => {
  const tags = post.tags ? JSON.parse(post.tags) : [];
  const images = post.images ? JSON.parse(post.images) : [];
  const documents = post.documents ? JSON.parse(post.documents) : [];

  return {
    id: post.id,
    date: post.published_at || post.created_at,
    date_gmt: post.published_at || post.created_at,
    modified: post.updated_at,
    modified_gmt: post.updated_at,
    slug: post.slug,
    status: post.status,
    type: 'ppd',
    link: `/pxl/personal-professional-development/${post.slug}?id=${post.id}`,
    title: {
      rendered: post.title,
    },
    content: {
      rendered: post.content,
      markdown: post.content,
      protected: false,
    },
    excerpt: {
      rendered: post.excerpt || '',
      protected: false,
    },
    author: post.author_id,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'open',
    sticky: post.is_featured,
    template: '',
    format: 'standard',
    meta: {
      footnotes: '',
    },
    categories: [],
    tags: tags,
    tags_list: tags.map((tag: string, index: number) => ({
      term_id: index + 1,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-'),
      term_taxonomy_id: index + 1,
      taxonomy: 'post_tag',
      description: '',
      parent: 0,
      count: 1,
      filter: 'raw',
    })),
    amp_enabled: false,
    thumbnail_url: post.thumbnail_url || null,
    featured_image_url: post.featured_image_url || null,
    images: images,
    documents: documents.length > 0 ? documents : undefined,
    youtube_video_url: post.youtube_video_url || null,
    total_views_count: views,
    guid: {
      rendered: `/pxl/personal-professional-development/${post.slug}`,
    },
    replies: {
      embeddable: false,
      href: '',
    },
    version_history: {
      count: 0,
      href: '',
    },
    predecessor_version: {
      id: 0,
      href: '',
    },
    wp_featuredmedia: {
      embeddable: false,
      href: '',
    },
    wp_attachment: {
      href: '',
    },
    wp_term: [],
    curies: [],
  };
};

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
    // Fetch directly from database
    const post = await prisma.ppd_posts.findFirst({
      where: {
        ...(postSlug ? { slug: postSlug } : { id: parseInt(postId) }),
      },
    });

    if (!post) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    // Only return published posts (or allow draft in development)
    if (post.status !== 'publish' && process.env.NODE_ENV === 'production') {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    // Get views count
    const contentMeta = await prisma.contentmeta.findFirst({
      where: {
        slug: post.slug,
        type: 'ppd',
      },
    });

    const views = contentMeta?.views || 0;

    // Transform to WordPress format
    const transformedPost = transformPPDPostToWordPressFormat(post, views);

    return {
      props: {
        post: {
          status: true,
          data: transformedPost,
        },
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
