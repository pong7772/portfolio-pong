const canonicalUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';
const metaImage = `${canonicalUrl}/images/pongpf.png`;
const metaDescription =
  'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator from Cambodia. Led development of GEIP EdTech App and MoEYS EdTech projects serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase. Currently in Belgium, originally from Cambodia.';

const defaultSEOConfig = {
  titleTemplate: '%s | Visothipong',
  defaultTitle:
    'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
  description: metaDescription,
  canonical: canonicalUrl,
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'Visothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស, Roth Samnangvisothipong, Roth Visothipong, Roth Samnang Visothipong, Full-Stack Developer, EdTech, GEIP EdTech, MoEYS EdTech, GEIP, MoEYS, Cambodia EdTech, Cambodian Developer, Web Developer, Mobile Developer, PHP Laravel, Flutter, React Native, Next.js, Firebase, Portfolio, Cambodia, Phnom Penh, Belgium, Hasselt, Software Engineer, EdTech Innovator, Cambodian Software Engineer, GEIP Developer, MoEYS Developer',
    },
    {
      name: 'author',
      content: 'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស)',
    },
    {
      name: 'alternate',
      content: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស',
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
      name: 'geo.region',
      content: 'BE',
    },
    {
      name: 'geo.placename',
      content: 'Belgium, Hasselt',
    },
    {
      name: 'ICBM',
      content: '11.5564, 104.9282', // Phnom Penh coordinates
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
      'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
    description: metaDescription,
    type: 'website',
    locale: 'en_US',
    siteName: 'Visothipong Portfolio - GEIP & MoEYS EdTech Developer',
    images: [
      {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: 'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
      },
      {
        url: metaImage,
        width: 800,
        height: 600,
        alt: 'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator | GEIP & MoEYS EdTech',
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
