const canonicalUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
const metaImage = `${canonicalUrl}/images/pongpf.png`;
const metaDescription =
  'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator. Led development of GEIP EdTech App serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase. Currently in Belgium, originally from Cambodia.';

const defaultSEOConfig = {
  titleTemplate: '%s | Roth Samnangvisothipong',
  defaultTitle:
    'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator',
  description: metaDescription,
  canonical: canonicalUrl,
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'Roth Samnangvisothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, Roth Visothipong, Visothipong, Full-Stack Developer, EdTech, Web Developer, Mobile Developer, PHP Laravel, Flutter, React Native, Next.js, Firebase, Portfolio, Cambodia, Belgium, Software Engineer, Cambodian Developer, EdTech Innovator',
    },
    {
      name: 'author',
      content: 'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស)',
    },
    {
      name: 'alternate',
      content: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      property: 'og:locale',
      content: 'en_US',
    },
    {
      property: 'og:locale:alternate',
      content: 'km_KH',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:site_name',
      content: 'Roth Samnangvisothipong Portfolio',
    },
  ],
  openGraph: {
    url: canonicalUrl,
    title:
      'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator',
    description: metaDescription,
    type: 'website',
    locale: 'en_US',
    siteName: 'Roth Samnangvisothipong Portfolio',
    images: [
      {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: 'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator',
      },
      {
        url: metaImage,
        width: 800,
        height: 600,
        alt: 'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator',
      },
    ],
  },
  twitter: {
    handle: '@visothipong',
    site: '@visothipong',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: `${canonicalUrl}/rss.xml`,
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: canonicalUrl,
    },
    {
      rel: 'alternate',
      hreflang: 'km',
      href: canonicalUrl,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: canonicalUrl,
    },
  ],
};

export default defaultSEOConfig;
