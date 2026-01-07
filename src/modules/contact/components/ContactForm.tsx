import clsx from 'clsx';
import { useState } from 'react';
import { FiClock as ClockIcon } from 'react-icons/fi';
import { toast } from 'sonner';

import Button from '@/common/components/elements/Button';

interface FormDataProps {
  name: string;
  email: string;
  message: string;
}

interface FormErrorsProps {
  name?: string;
  email?: string;
  message?: string;
}

const formInitialState: FormDataProps = {
  name: '',
  email: '',
  message: '',
};

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  'a7ec671f-a051-4f42-be7b-4814a75bcebb';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormDataProps>(formInitialState);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrorsProps = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrorsProps]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    try {
      // Submit to our API which will save to DB, send Telegram, and forward to Web3Forms
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData(formInitialState);
        setFormErrors({});
      } else {
        toast.error(
          data.error ||
            data.message ||
            'Failed to send message. Please try again.',
        );
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim().length >= 10;

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='flex-1'>
          <input
            className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
              formErrors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:border-red-500'
                : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700 dark:focus:border-blue-400'
            } bg-white dark:bg-neutral-900`}
            type='text'
            placeholder='Your Name *'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
              {formErrors.name}
            </p>
          )}
        </div>
        <div className='flex-1'>
          <input
            className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
              formErrors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:border-red-500'
                : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700 dark:focus:border-blue-400'
            } bg-white dark:bg-neutral-900`}
            type='email'
            placeholder='Your Email *'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
              {formErrors.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <textarea
          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
            formErrors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:border-red-500'
              : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700 dark:focus:border-blue-400'
          } bg-white dark:bg-neutral-900`}
          rows={6}
          placeholder='Your Message *'
          name='message'
          value={formData.message}
          onChange={handleChange}
        />
        {formErrors.message && (
          <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
            {formErrors.message}
          </p>
        )}
      </div>
      <Button
        className={clsx(
          'w-full justify-center bg-neutral-800 py-3 font-medium transition-all hover:scale-[101%] hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-950 hover:dark:bg-neutral-100',
        )}
        type='submit'
        icon={<></>}
        data-umami-event='Send Contact Message'
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? (
          <span className='flex items-center gap-2'>
            <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>

      <div className='my-5 flex items-center gap-2 dark:text-neutral-400'>
        <ClockIcon />
        <div className='text-sm'>
          <span className='font-medium'>Avg. response:</span> 1-2 Hours (Working
          Hours, GMT+7)
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
