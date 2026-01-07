import axios from 'axios';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import { FiSend as SendIcon } from 'react-icons/fi';
import { toast } from 'sonner';

import Button from '@/common/components/elements/Button';

interface GuestbookFormProps {
  onSendMessage: (
    name: string,
    email: string,
    message: string,
    image?: string,
  ) => Promise<void>;
  isWidget?: boolean;
  session?: any;
}

const GuestbookForm = ({
  onSendMessage,
  isWidget,
  session,
}: GuestbookFormProps) => {
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 3) {
      newErrors.message = 'Message must be at least 3 characters';
    } else if (message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    if (isSending) return;

    setIsSending(true);

    try {
      await onSendMessage(
        name.trim(),
        email.trim(),
        message.trim(),
        session?.user?.image,
      );
      setMessage('');
      if (!session) {
        setName('');
        setEmail('');
      }
      toast.success('Message posted successfully!');
      setErrors({});
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        'Failed to post message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const isFormValid =
    name.trim() &&
    email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length >= 3 &&
    message.trim().length <= 1000;

  return (
    <div className='border-t border-neutral-300 dark:border-neutral-800'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-4'>
        {!session && (
          <div className='flex flex-col gap-3 md:flex-row'>
            <div className='flex-1'>
              <input
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: undefined });
                  }
                }}
                placeholder='Your Name *'
                className={`w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700'
                    : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700'
                } bg-white dark:bg-neutral-900`}
                disabled={isSending}
              />
              {errors.name && (
                <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
                  {errors.name}
                </p>
              )}
            </div>
            <div className='flex-1'>
              <input
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                placeholder='Your Email *'
                className={`w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700'
                    : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700'
                } bg-white dark:bg-neutral-900`}
                disabled={isSending}
              />
              {errors.email && (
                <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        )}

        <div className='flex gap-2'>
          <input
            type='text'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) {
                setErrors({ ...errors, message: undefined });
              }
            }}
            placeholder={
              session ? 'Leave a message...' : 'Type your message here...'
            }
            className={`flex-grow rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 ${
              errors.message
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700'
                : 'border-neutral-200 focus:border-blue-500 focus:ring-blue-200 dark:border-neutral-700'
            } bg-white dark:bg-neutral-900`}
            disabled={isSending}
          />
          <button
            type='submit'
            className={clsx(
              'flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-white transition-all hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50',
              !isFormValid && 'cursor-not-allowed opacity-50',
            )}
            disabled={!isFormValid || isSending}
            data-umami-event='Guestbook: Send Message'
          >
            {isSending ? (
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
            ) : (
              <SendIcon size={18} />
            )}
          </button>
        </div>
        {errors.message && (
          <p className='text-xs text-red-600 dark:text-red-400'>
            {errors.message}
          </p>
        )}
        {session && (
          <p className='text-xs text-neutral-500 dark:text-neutral-400'>
            Posting as {session.user?.name || session.user?.email}
          </p>
        )}
      </form>
    </div>
  );
};

export default GuestbookForm;
