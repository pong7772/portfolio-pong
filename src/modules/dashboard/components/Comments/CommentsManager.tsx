import { useState, useEffect } from 'react';
import { FiMessageSquare as CommentIcon } from 'react-icons/fi';
import { toast } from 'sonner';
import useSWR from 'swr';

import Breakline from '@/common/components/elements/Breakline';
import SectionHeading from '@/common/components/elements/SectionHeading';

interface Comment {
  id: number;
  slug: string;
  type: string;
  name: string;
  email: string;
  message: string;
  image: string | null;
  admin_reply: string | null;
  replied_at: string | null;
  is_show: boolean;
  created_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then((data) => data.data || []));

const CommentsManager = () => {
  const { data: comments, mutate } = useSWR<Comment[]>(
    '/api/admin/comments',
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    },
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (comments) {
      const initialReplies: Record<number, string> = {};
      comments.forEach((comment) => {
        if (comment.admin_reply) {
          initialReplies[comment.id] = comment.admin_reply;
        }
      });
      setReplyTexts(initialReplies);
    }
  }, [comments]);

  const saveReply = async (id: number) => {
    const replyText = replyTexts[id] || '';

    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          admin_reply: replyText.trim() || null,
        }),
      });

      const data = await response.json();

      if (data.status) {
        toast.success('Reply saved successfully');
        setEditingId(null);
        mutate();
      } else {
        toast.error(data.error || 'Failed to save reply');
      }
    } catch (error) {
      toast.error('Failed to save reply');
    }
  };

  const toggleVisibility = async (id: number, currentVisibility: boolean) => {
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          is_show: !currentVisibility,
        }),
      });

      const data = await response.json();

      if (data.status) {
        toast.success(
          `Comment ${!currentVisibility ? 'shown' : 'hidden'} successfully`,
        );
        mutate();
      } else {
        toast.error(data.error || 'Failed to update comment');
      }
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  return (
    <section className='space-y-6'>
      <SectionHeading
        title='Comments Moderation'
        icon={<CommentIcon className='mr-2' />}
      />

      <div className='space-y-4'>
        {!comments ? (
          <div className='rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-500' />
            <p className='mt-4 text-neutral-600 dark:text-neutral-400'>
              Loading comments...
            </p>
          </div>
        ) : comments.length === 0 ? (
          <div className='rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900'>
            <CommentIcon className='mx-auto mb-4 text-4xl text-neutral-400' />
            <p className='text-neutral-600 dark:text-neutral-400'>
              No comments yet
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className='rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900'
            >
              <div className='space-y-4'>
                {/* Comment Header */}
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          comment.type === 'blog'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}
                      >
                        {comment.type === 'blog' ? '📝 Blog' : '📚 Learning'}
                      </span>
                      <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                        /{comment.slug}
                      </span>
                    </div>
                    <h3 className='mt-2 font-semibold text-neutral-800 dark:text-neutral-200'>
                      {comment.name}
                    </h3>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='checkbox'
                      checked={comment.is_show}
                      onChange={() =>
                        toggleVisibility(comment.id, comment.is_show)
                      }
                      className='rounded'
                    />
                    Show
                  </label>
                </div>

                {/* Comment Message */}
                <div className='rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50'>
                  <p className='text-neutral-700 dark:text-neutral-300'>
                    {comment.message}
                  </p>
                </div>

                {/* Admin Reply Section */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Your Reply:
                  </label>
                  <textarea
                    value={replyTexts[comment.id] || ''}
                    onChange={(e) =>
                      setReplyTexts({
                        ...replyTexts,
                        [comment.id]: e.target.value,
                      })
                    }
                    onFocus={() => setEditingId(comment.id)}
                    placeholder='Type your reply here...'
                    rows={3}
                    className='w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-blue-400'
                  />
                  {comment.replied_at && (
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                      Replied: {new Date(comment.replied_at).toLocaleString()}
                    </p>
                  )}
                  <div className='flex justify-end'>
                    <button
                      onClick={() => saveReply(comment.id)}
                      className='rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600'
                    >
                      {comment.admin_reply ? 'Update Reply' : 'Save Reply'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentsManager;
