import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

import Container from '@/common/components/elements/Container';
import StructuredData from '@/common/components/elements/StructuredData';
import prisma from '@/common/libs/prisma';
import { Story } from '@/common/types/stories';

// Lazy load heavy components
const Home = dynamic(() => import('@/modules/home'), {
  loading: () => <div className='min-h-screen' />,
  ssr: true,
});

interface HomePageProps {
  stories: Story[];
}

const HomePage: NextPage<HomePageProps> = ({ stories }) => {
  const canonicalUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
  const metaDescription =
    'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator from Cambodia. Led development of GEIP EdTech App and MoEYS EdTech projects serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase. Currently in Belgium, originally from Cambodia.';

  return (
    <>
      <NextSeo
        title='Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech'
        description={metaDescription}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title:
            'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
          description: metaDescription,
          type: 'website',
          locale: 'en_US',
          images: [
            {
              url: `${canonicalUrl}/images/pongpf.png`,
              width: 1200,
              height: 630,
              alt: 'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
            },
          ],
          siteName: 'Visothipong Portfolio - GEIP & MoEYS EdTech Developer',
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@visothipong',
          site: '@visothipong',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'Visothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស, Roth Samnangvisothipong, GEIP EdTech, MoEYS EdTech, GEIP, MoEYS, Cambodia EdTech, Cambodian Developer, Full-Stack Developer, EdTech, Cambodia, Phnom Penh, Belgium',
          },
          {
            name: 'geo.region',
            content: 'KH',
          },
          {
            name: 'geo.placename',
            content: 'Cambodia, Phnom Penh',
          },
          {
            name: 'geo.position',
            content: '11.5564;104.9282',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'alternate',
            hrefLang: 'en',
            href: canonicalUrl,
          },
          {
            rel: 'alternate',
            hrefLang: 'km',
            href: canonicalUrl,
          },
        ]}
      />
      <StructuredData type='Person' />
      <StructuredData type='WebSite' />
      <Container data-aos='fade-up'>
        <Home stories={stories} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const stories = await prisma.stories.findMany({
      where: {
        is_show: true,
      },
      orderBy: {
        order: 'asc',
      },
      take: 10, // Limit to 10 stories for faster load
    });

    return {
      props: {
        stories: JSON.parse(JSON.stringify(stories)),
      },
      // Revalidate every 60 seconds (ISR)
      revalidate: 60,
    };
  } catch (error) {
    // Error fetching stories
    return {
      props: {
        stories: [],
      },
      revalidate: 60,
    };
  }
};

export default HomePage;
