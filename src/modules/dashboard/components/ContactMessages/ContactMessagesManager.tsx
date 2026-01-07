import { useState, useEffect } from 'react';
import { FiMail as MailIcon, FiCheck as CheckIcon } from 'react-icons/fi';
import { toast } from 'sonner';
import useSWR from 'swr';

import Breakline from '@/common/components/elements/Breakline';
import SectionHeading from '@/common/components/elements/SectionHeading';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then((data) => data.data || []));

const ContactMessagesManager = () => {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const { data: messages, mutate } = useSWR<ContactMessage[]>(
    `/api/admin/contact?unread_only=${unreadOnly}`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    },
  );

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch('/api/admin/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, is_read: true }),
      });

      const data = await response.json();

      if (data.status) {
        toast.success('Message marked as read');
        mutate();
      } else {
        toast.error(data.error || 'Failed to update message');
      }
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0;

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <SectionHeading
          title='Contact Messages'
          icon={<MailIcon className='mr-2' />}
        />
        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
            <input
              type='checkbox'
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
              className='rounded'
            />
            Unread only
          </label>
          {unreadCount > 0 && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white'>
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      <div className='space-y-4'>
        {!messages ? (
          <div className='rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-500' />
            <p className='mt-4 text-neutral-600 dark:text-neutral-400'>
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className='rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900'>
            <MailIcon className='mx-auto mb-4 text-4xl text-neutral-400' />
            <p className='text-neutral-600 dark:text-neutral-400'>
              No {unreadOnly ? 'unread ' : ''}messages yet
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg border p-6 transition-colors ${
                message.is_read
                  ? 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                  : 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20'
              }`}
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-3'>
                    <h3 className='font-semibold text-neutral-800 dark:text-neutral-200'>
                      {message.name}
                    </h3>
                    {!message.is_read && (
                      <span className='rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white'>
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className='text-sm text-blue-600 hover:underline dark:text-blue-400'
                  >
                    {message.email}
                  </a>
                  <p className='text-neutral-700 dark:text-neutral-300'>
                    {message.message}
                  </p>
                  <p className='text-xs text-neutral-500 dark:text-neutral-500'>
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
                {!message.is_read && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className='flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                    title='Mark as read'
                  >
                    <CheckIcon size={16} />
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ContactMessagesManager;
