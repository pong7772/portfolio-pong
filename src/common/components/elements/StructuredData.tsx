import Head from 'next/head';

interface StructuredDataProps {
  type?: 'Person' | 'WebSite' | 'Article' | 'BlogPosting';
  data?: Record<string, any>;
}

const StructuredData = ({ type = 'Person', data }: StructuredDataProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app';

  const getStructuredData = () => {
    switch (type) {
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Roth Samnangvisothipong',
          alternateName: [
            'រ័ត្ន សំណាងវិសុទ្ធិពង្ស',
            'Roth Visothipong',
            'Visothipong',
            'Roth Samnang Visothipong',
          ],
          givenName: 'Roth Samnang',
          familyName: 'Visothipong',
          jobTitle: 'Full-Stack Developer & EdTech Innovator',
          description:
            'Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator with 3+ years of experience. Led development of GEIP EdTech App serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase.',
          url: baseUrl,
          image: `${baseUrl}/images/pongpf.png`,
          email: 'visothipong7772@gmail.com',
          sameAs: [
            'https://twitter.com/visothipong',
            'https://github.com/pong7772',
            'https://www.linkedin.com/in/roth-samnangvisothipong-3333ab1aa',
            'https://www.facebook.com/visothipongroth',
          ],
          knowsAbout: [
            'Web Development',
            'Mobile Development',
            'EdTech',
            'PHP Laravel',
            'Flutter',
            'React Native',
            'Next.js',
            'Firebase',
            'Full-Stack Development',
            'Software Engineering',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BE',
            addressLocality: 'Hasselt',
          },
          nationality: {
            '@type': 'Country',
            name: 'Cambodia',
          },
          alumniOf: [
            {
              '@type': 'EducationalOrganization',
              name: 'Hogeschool PXL',
            },
            {
              '@type': 'EducationalOrganization',
              name: 'Kirirom Institute of Technology',
            },
          ],
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Roth Samnangvisothipong Portfolio',
          alternateName: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស Portfolio',
          url: baseUrl,
          description:
            'Portfolio website of Roth Samnangvisothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator',
          inLanguage: ['en', 'km'],
          author: {
            '@type': 'Person',
            name: 'Roth Samnangvisothipong',
            alternateName: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };

      case 'Article':
      case 'BlogPosting':
        if (!data) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.description || data.excerpt,
          image: data.image || `${baseUrl}/images/pongpf.png`,
          datePublished: data.publishedTime || data.date,
          dateModified: data.modifiedTime || data.date,
          author: {
            '@type': 'Person',
            name: 'Roth Samnangvisothipong',
            alternateName: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Roth Samnangvisothipong Portfolio',
            alternateName: 'រ័ត្ន សំណាងវិសុទ្ធិពង្ស Portfolio',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/pongpf.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || baseUrl,
          },
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default StructuredData;
