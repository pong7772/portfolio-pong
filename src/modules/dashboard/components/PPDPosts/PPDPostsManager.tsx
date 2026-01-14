import { useEffect, useState } from 'react';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import { PPDPost } from '@/services/ppd-posts';
import { deletePPDPost, getPPDPosts } from '@/services/ppd-posts';

import PPDPostForm from './PPDPostForm';

const PPDPostsManager = () => {
  const [posts, setPosts] = useState<PPDPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<PPDPost | undefined>();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await getPPDPosts();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to fetch PPD posts');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this PPD post?')) {
      return;
    }

    try {
      await deletePPDPost(id);
      toast.success('PPD post deleted successfully');
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete PPD post');
      console.error(error);
    }
  };

  const handleEdit = (post: PPDPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPost(undefined);
    fetchPosts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPost(undefined);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Manage PPD Posts</h2>
        <button
          onClick={() => setShowForm(true)}
          className='flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600'
        >
          <BiPlus size={20} />
          <span>Add PPD Post</span>
        </button>
      </div>

      {showForm && (
        <PPDPostForm
          post={editingPost}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-indigo-500' />
        </div>
      ) : posts.length === 0 ? (
        <Card className='p-8 text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            No PPD posts yet. Create your first PPD post!
          </p>
        </Card>
      ) : (
        <div className='space-y-4'>
          {posts.map((post) => (
            <Card key={post.id} className='p-6'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <div className='mb-2 flex items-center gap-3'>
                    <h3 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200'>
                      {post.title}
                    </h3>
                    {post.is_featured && (
                      <span className='rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'>
                        Featured
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        post.status === 'publish'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
                    Slug:{' '}
                    <code className='rounded bg-neutral-100 px-1 dark:bg-neutral-800'>
                      {post.slug}
                    </code>
                  </p>
                  {post.excerpt && (
                    <p className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
                      {post.excerpt}
                    </p>
                  )}
                  <div className='flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400'>
                    <span>
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {post.published_at && (
                      <span>
                        Published:{' '}
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEdit(post)}
                    className='rounded-lg bg-indigo-500 p-2 text-white transition-colors hover:bg-indigo-600'
                    title='Edit'
                  >
                    <BiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className='rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600'
                    title='Delete'
                  >
                    <BiTrash size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PPDPostsManager;
