import Breakline from '@/common/components/elements/Breakline';
import { Story } from '@/common/types/stories';

import BlogPreview from './BlogPreview';
import Introduction from './Introduction';
import Services from './Services';
import SkillsSection from './SkillsSection';

interface HomeProps {
  stories?: Story[];
}

const Home = ({ stories = [] }: HomeProps) => {
  return (
    <>
      <Introduction stories={stories} />
      <Breakline className='mb-7 mt-8' />
      <BlogPreview />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
    </>
  );
};

export default Home;
