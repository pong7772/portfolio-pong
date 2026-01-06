import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';

const Chat = dynamic(() => import('@/modules/chat'), { ssr: false });

const PAGE_TITLE = 'Guestbook';
const PAGE_DESCRIPTION =
  'Leave whatever you like to say, suggestions, questions or anything!';

const GuestBookPage: NextPage = () => {
  const canonicalUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';

  return (
    <>
      <NextSeo
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={`${canonicalUrl}/guestbook`}
        openGraph={{
          url: `${canonicalUrl}/guestbook`,
          title: `${PAGE_TITLE} - Visothipong`,
          description: PAGE_DESCRIPTION,
          type: 'website',
          images: [
            {
              url: `${canonicalUrl}/images/pongpf.png`,
              width: 1200,
              height: 630,
              alt: 'Visothipong Guestbook',
            },
          ],
        }}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Chat />
      </Container>
    </>
  );
};

export default GuestBookPage;
