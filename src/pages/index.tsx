import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import StructuredData from '@/common/components/elements/StructuredData';
import prisma from '@/common/libs/prisma';
import { Story } from '@/common/types/stories';
import Home from '@/modules/home';

interface HomePageProps {
  stories: Story[];
}

const HomePage: NextPage<HomePageProps> = ({ stories }) => {
  const canonicalUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
  const metaDescription =
    'Full-Stack Developer & EdTech Innovator with 3+ years of experience. Led development of GEIP EdTech App serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase.';

  return (
    <>
      <NextSeo
        title='Roth Visothipong - Full-Stack Developer & EdTech Innovator'
        description={metaDescription}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: 'Roth Visothipong - Full-Stack Developer & EdTech Innovator',
          description: metaDescription,
          type: 'website',
          images: [
            {
              url: `${canonicalUrl}/images/pongpf.png`,
              width: 1200,
              height: 630,
              alt: 'Roth Visothipong - Full-Stack Developer & EdTech Innovator',
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
      <StructuredData type='Person' />
      <StructuredData type='WebSite' />
      <Container data-aos='fade-up'>
        <Home stories={stories} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const stories = await prisma.stories.findMany({
      where: {
        is_show: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return {
      props: {
        stories: JSON.parse(JSON.stringify(stories)),
      },
    };
  } catch (error) {
    // Error fetching stories
    return {
      props: {
        stories: [],
      },
    };
  }
};

export default HomePage;
