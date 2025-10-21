import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import prisma from '@/common/libs/prisma';
import { Story } from '@/common/types/stories';
import Home from '@/modules/home';

interface HomePageProps {
  stories: Story[];
}

const HomePage: NextPage<HomePageProps> = ({ stories }) => {
  return (
    <>
      <NextSeo title='Visothipong - Personal Website' />
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
