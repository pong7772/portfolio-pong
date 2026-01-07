import { FormEvent, useMemo, useState } from 'react';
import useSWR from 'swr';

import EmptyState from '@/common/components/elements/EmptyState';
import Loading from '@/common/components/elements/Loading';
import { Comment, CommentType } from '@/common/types/comment';
import { fetcher } from '@/services/fetcher';
import { toast } from 'sonner';

import CommentItem from './CommentItem';

type CommentListProps = {
  slug: string;
  type?: CommentType;
};

const CommentList = ({ slug, type = 'blog' }: CommentListProps) => {
  const { data, isLoading, mutate } = useSWR(
    `/api/comments?slug=${encodeURIComponent(slug)}&type=${type}`,
    fetcher,
  );

  const commentsData: Comment[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <Loading />;

  const totalComments = commentsData.length;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields before submitting your comment.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 3) {
      toast.error('Message must be at least 3 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          type,
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.error || 'Failed to submit comment');
      }

      toast.success('Thank you! Your comment has been posted.');
      setName('');
      setEmail('');
      setMessage('');
      mutate();
    } catch (error: any) {
      toast.error(
        error?.message || 'Failed to submit comment. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='space-y-6 pb-10 pt-6'>
      <div className='space-y-4'>
        {totalComments >= 1 ? (
          <>
            <div className='pb-2 text-lg font-semibold sm:text-xl'>
              {totalComments} Comment{totalComments > 1 && 's'}
            </div>
            <div className='space-y-4'>
              {commentsData?.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState message='No comments yet. Be the first to share your thoughts!' />
        )}
      </div>

      <div className='mt-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/60 sm:p-5'>
        <h3 className='mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg'>
          Leave a comment
        </h3>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <input
              type='text'
              placeholder='Your name *'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
            />
            <input
              type='email'
              placeholder='Your email *'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
            />
          </div>
          <textarea
            placeholder='Share your thoughts...'
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
          />
          <div className='flex items-center justify-between gap-3'>
            <p className='text-[11px] text-neutral-500 dark:text-neutral-500'>
              Your email will not be published. Required fields are marked with
              *.
            </p>
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200'
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CommentList;
