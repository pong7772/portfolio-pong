const canonicalUrl = 'https://pong7772.github.io';
const metaImage = 'https://cloud.aulianza.com/public/images/aulianza-id.png';
const metaDescription =
  'A highly motivated and results-oriented Full-Stack Developer with over 3 years of experience designing, developing, and deploying scalable web and mobile applications.';

const defaultSEOConfig = {
  defaultTitle: 'Roth Samnang Visothipong - Personal Website',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Roth Samnang Visothipong - Personal Website',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'pong7772.github.io og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'pong7772.github.io og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'pong7772.github.io og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'pong7772.github.io',
  },
  twitter: {
    handle: '@visothipong',
    site: '@visothipong',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
