import { useEffect, useState } from 'react';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import { Blog } from '@/services/blogs';
import { deleteBlog, getBlogs } from '@/services/blogs';

import BlogForm from './BlogForm';

const BlogsManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>();

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await deleteBlog(id);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog');
      console.error(error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBlog(undefined);
    fetchBlogs();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBlog(undefined);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Manage Blogs</h2>
        <button
          onClick={() => setShowForm(true)}
          className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          <BiPlus size={20} />
          <span>Add Blog</span>
        </button>
      </div>

      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500' />
        </div>
      ) : blogs.length === 0 ? (
        <Card className='p-8 text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            No blogs yet. Create your first blog post!
          </p>
        </Card>
      ) : (
        <div className='space-y-4'>
          {blogs.map((blog) => (
            <Card key={blog.id} className='p-6'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3'>
                    <h3 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200'>
                      {blog.title}
                    </h3>
                    {blog.is_featured && (
                      <span className='rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>
                        Featured
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        blog.status === 'publish'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                  <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                    /{blog.slug}
                  </p>
                  {blog.excerpt && (
                    <p className='mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400'>
                      {blog.excerpt}
                    </p>
                  )}
                  <div className='mt-3 flex items-center gap-4 text-xs text-neutral-500'>
                    <span>
                      Created: {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                    {blog.published_at && (
                      <span>
                        Published:{' '}
                        {new Date(blog.published_at).toLocaleDateString()}
                      </span>
                    )}
                    {blog.tags && (
                      <span>Tags: {JSON.parse(blog.tags).join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEdit(blog)}
                    className='rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600'
                    title='Edit blog'
                  >
                    <BiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className='rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600'
                    title='Delete blog'
                  >
                    <BiTrash size={16} />
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

export default BlogsManager;
