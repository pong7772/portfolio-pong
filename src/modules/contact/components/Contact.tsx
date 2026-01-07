import Breakline from '@/common/components/elements/Breakline';

import BookACall from './BookACall';
import ContactForm from './ContactForm';
import SocialMediaList from './SocialMediaList';
import TelegramQR from './TelegramQR';

const Contact = () => {
  return (
    <section className='space-y-6'>
      <SocialMediaList />
      <Breakline />

      {/* Telegram QR Code Section */}
      <div className='space-y-5'>
        <TelegramQR />
      </div>

      <Breakline />
      <BookACall />
      <Breakline />
      <div className='space-y-5'>
        <h3 className='text-lg font-medium'>Or send me a message</h3>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
