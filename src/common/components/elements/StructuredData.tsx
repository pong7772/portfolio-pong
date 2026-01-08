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
          name: 'Visothipong',
          alternateName: [
            'រ័ត្ន សំណាងវិសុទ្ធិពង្ស',
            'វិសុទ្ធិពង្ស',
            'Roth Samnangvisothipong',
            'Roth Visothipong',
            'Roth Samnang Visothipong',
          ],
          givenName: 'Roth Samnang',
          familyName: 'Visothipong',
          jobTitle: 'Full-Stack Developer & EdTech Innovator',
          description:
            'Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator from Cambodia. Led development of GEIP EdTech App and MoEYS EdTech projects serving 400,000+ students. Expert in PHP Laravel, Flutter, React Native, Next.js, and Firebase. Currently in Belgium, originally from Cambodia.',
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
            'GEIP EdTech',
            'MoEYS EdTech',
            'PHP Laravel',
            'Flutter',
            'React Native',
            'Next.js',
            'Firebase',
            'Full-Stack Development',
            'Software Engineering',
            'Cambodia EdTech',
            'Educational Technology',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'KH',
            addressLocality: 'Phnom Penh',
            addressRegion: 'Phnom Penh',
          },
          homeLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'KH',
              addressLocality: 'Phnom Penh',
            },
          },
          workLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BE',
              addressLocality: 'Hasselt',
              addressRegion: 'Limburg',
            },
          },
          nationality: {
            '@type': 'Country',
            name: 'Cambodia',
          },
          birthPlace: {
            '@type': 'Place',
            addressCountry: 'KH',
            addressLocality: 'Cambodia',
          },
          worksFor: [
            {
              '@type': 'Organization',
              name: 'GEIP EdTech',
              description:
                'GEIP EdTech Platform serving 400,000+ students in Cambodia',
            },
            {
              '@type': 'Organization',
              name: 'MoEYS EdTech',
              description:
                'Ministry of Education, Youth and Sport EdTech projects',
            },
          ],
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
          name: 'Visothipong Portfolio',
          alternateName: [
            'រ័ត្ន សំណាងវិសុទ្ធិពង្ស Portfolio',
            'វិសុទ្ធិពង្ស Portfolio',
            'Roth Samnangvisothipong Portfolio',
          ],
          url: baseUrl,
          description:
            'Portfolio website of Visothipong (រ័ត្ន សំណាងវិសុទ្ធិពង្ស, វិសុទ្ធិពង្ស) - Full-Stack Developer & EdTech Innovator. GEIP EdTech and MoEYS EdTech Developer from Cambodia.',
          inLanguage: ['en', 'km'],
          author: {
            '@type': 'Person',
            name: 'Visothipong',
            alternateName: ['រ័ត្ន សំណាងវិសុទ្ធិពង្ស', 'វិសុទ្ធិពង្ស'],
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
            name: 'Visothipong',
            alternateName: ['រ័ត្ន សំណាងវិសុទ្ធិពង្ស', 'វិសុទ្ធិពង្ស'],
            url: baseUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Visothipong Portfolio',
            alternateName: [
              'រ័ត្ន សំណាងវិសុទ្ធិពង្ស Portfolio',
              'វិសុទ្ធិពង្ស Portfolio',
            ],
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
