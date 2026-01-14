import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { PPDList } from '@/modules/ppd';

const PAGE_TITLE = 'Personal and Professional Development';
const PAGE_DESCRIPTION =
  'Explore my journey of personal and professional development through coaching sessions, reflections, and growth experiences.';

const PersonalProfessionalDevelopment = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Visothipong`}
        description={PAGE_DESCRIPTION}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/pxl/personal-professional-development`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://visothipongroth.vercel.app'}/pxl/personal-professional-development`,
          title: `${PAGE_TITLE} - Visothipong`,
          description: PAGE_DESCRIPTION,
          type: 'website',
          siteName: 'Visothipong Portfolio',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'Personal and Professional Development, PPD, PXL, Hogeschool PXL, Coaching Session, Visothipong, រ័ត្ន សំណាងវិសុទ្ធិពង្ស, Professional Growth, Belgium, Master of Education',
          },
        ]}
      />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <PPDList />
      </Container>
    </>
  );
};

export default PersonalProfessionalDevelopment;
