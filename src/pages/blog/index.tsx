import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import BlogListNew from '@/modules/blog';

const PAGE_TITLE = 'Blog';

const BlogPage: NextPage = () => {
  const canonicalUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
  const description =
    'Read articles and blog posts by Roth Visothipong about web development, EdTech, software engineering, and technology insights.';

  return (
    <>
      <NextSeo
        title={PAGE_TITLE}
        description={description}
        canonical={`${canonicalUrl}/blog`}
        openGraph={{
          url: `${canonicalUrl}/blog`,
          title: `${PAGE_TITLE} - Visothipong`,
          description: description,
          type: 'website',
          images: [
            {
              url: `${canonicalUrl}/images/pongpf.png`,
              width: 1200,
              height: 630,
              alt: 'Visothipong Blog',
            },
          ],
        }}
      />
      <Container className='xl:!-mt-5' data-aos='fade-up'>
        <BlogListNew />
      </Container>
    </>
  );
};

export default BlogPage;
