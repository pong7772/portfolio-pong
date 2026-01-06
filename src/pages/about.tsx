import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import About from '@/modules/about';

const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'Full-Stack Developer & EdTech Innovator with 3+ years of experience. Led development of GEIP EdTech App serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase.';

const AboutPage: NextPage = () => {
  const canonicalUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';

  return (
    <>
      <NextSeo
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={`${canonicalUrl}/about`}
        openGraph={{
          url: `${canonicalUrl}/about`,
          title: `${PAGE_TITLE} - Visothipong`,
          description: PAGE_DESCRIPTION,
          type: 'profile',
          images: [
            {
              url: `${canonicalUrl}/images/pongpf.png`,
              width: 1200,
              height: 630,
              alt: 'Roth Visothipong - About',
            },
          ],
        }}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About />
      </Container>
    </>
  );
};

export default AboutPage;
