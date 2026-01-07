import Breakline from '@/common/components/elements/Breakline';
import { Story } from '@/common/types/stories';

import BioPoem from './BioPoem';
import BlogPreview from './BlogPreview';
import Introduction from './Introduction';
import Services from './Services';
import SkillsSection from './SkillsSection';

interface HomeProps {
  stories?: Story[];
}

const Home = ({ stories = [] }: HomeProps) => {
  return (
    <div className='mt-0 sm:mt-2 md:mt-2'>
      <Introduction stories={stories} />
      <Breakline className='mb-7 mt-8' />
      <BlogPreview />
      <Breakline className='my-8' />
      <BioPoem />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
    </div>
  );
};

export default Home;
