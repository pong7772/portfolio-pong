import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import StructuredData from '@/common/components/elements/StructuredData';
import { formatExcerpt } from '@/common/helpers';
import { BlogDetailProps } from '@/common/types/blog';
import BlogDetail from '@/modules/blog/components/BlogDetail';
import CommentList from '@/modules/blog/components/CommentList';
import { getBlogDetail } from '@/services/blog';

interface BlogDetailPageProps {
  blog: {
    data: BlogDetailProps;
  };
}

const BlogDetailPage: NextPage<BlogDetailPageProps> = ({ blog }) => {
  const blogData = blog?.data || {};

  const slug = `blog/${blogData?.slug}?id=${blogData?.id}`;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
  const canonicalUrl = `${baseUrl}/${slug}`;
  const description =
    formatExcerpt(blogData?.excerpt?.rendered) ||
    'Read this article by Roth Visothipong about web development, EdTech, and technology.';

  const incrementViews = async () => {
    await axios.post(`/api/views?&slug=${blogData?.slug}`);
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
        title={`${blogData?.title?.rendered} - Blog Visothipong`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: blogData?.date,
            modifiedTime: blogData?.modified || blogData?.date,
            authors: ['Roth Visothipong'],
            tags: blogData?.tags_list?.map((tag) => tag.name) || [],
          },
          url: canonicalUrl,
          title: blogData?.title?.rendered,
          description: description,
          images: blogData?.featured_image_url
            ? [
                {
                  url: blogData.featured_image_url,
                  width: 1200,
                  height: 630,
                  alt: blogData?.title?.rendered,
                },
              ]
            : [
                {
                  url: `${baseUrl}/images/pongpf.png`,
                  width: 1200,
                  height: 630,
                  alt: blogData?.title?.rendered,
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
          title: blogData?.title?.rendered,
          description: description,
          excerpt: formatExcerpt(blogData?.excerpt?.rendered),
          image: blogData?.featured_image_url,
          publishedTime: blogData?.date,
          modifiedTime: blogData?.modified || blogData?.date,
          url: canonicalUrl,
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/blog' />
        <BlogDetail {...blogData} />
        <section id='comments'>
          <CommentList id={blogData?.id} />
        </section>
      </Container>
    </>
  );
};

export default BlogDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blogId = context.query?.id as string;

  if (!blogId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await getBlogDetail(parseInt(blogId));

  if (response?.status === 404) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      blog: response,
    },
  };
};
