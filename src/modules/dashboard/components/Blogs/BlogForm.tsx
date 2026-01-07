import { useState } from 'react';
import { BiImage, BiX } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import ImageManager from '@/common/components/elements/ImageManager';
import RichTextEditor from '@/common/components/elements/RichTextEditor';
import { BlogFormData, Blog } from '@/services/blogs';
import { createBlog, updateBlog } from '@/services/blogs';

interface BlogFormProps {
  blog?: Blog;
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogForm = ({ blog, onSuccess, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: blog?.title || '',
    slug: blog?.slug || '',
    content: blog?.content || '',
    excerpt: blog?.excerpt || '',
    featured_image_url: blog?.featured_image_url || '',
    images: blog?.images ? JSON.parse(blog.images) : [],
    status: (blog?.status as 'draft' | 'publish') || 'draft',
    is_featured: blog?.is_featured || false,
    tags: blog?.tags ? JSON.parse(blog.tags) : [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title });
    if (!blog && !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(title) }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const submitData = {
        ...formData,
        images:
          formData.images && formData.images.length > 0
            ? formData.images
            : undefined,
        published_at:
          formData.status === 'publish' ? new Date().toISOString() : undefined,
      };

      if (blog) {
        await updateBlog(blog.id, submitData);
        toast.success('Blog updated successfully');
      } else {
        await createBlog(submitData);
        toast.success('Blog created successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className='border-blue-200 p-6 dark:border-blue-800'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'>
            <BiImage className='text-blue-600 dark:text-blue-400' size={20} />
          </div>
          <h3 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
            {blog ? 'Edit Blog' : 'Create New Blog'}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className='rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800'
        >
          <BiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={formData.title}
            onChange={handleTitleChange}
            className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            required
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Slug <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: generateSlug(e.target.value) })
            }
            className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            required
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Featured Image URL
          </label>
          <input
            type='url'
            value={formData.featured_image_url}
            onChange={(e) =>
              setFormData({ ...formData, featured_image_url: e.target.value })
            }
            className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            placeholder='https://example.com/image.jpg'
          />
        </div>

        <div>
          <ImageManager
            images={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            maxImages={20}
            label='Additional Images'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            rows={3}
            className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            placeholder='Brief description of the blog post...'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Content <span className='text-red-500'>*</span>
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder='Write your blog content here. You can add links, images, and format text easily...'
            height='500px'
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'draft' | 'publish',
                })
              }
              className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            >
              <option value='draft'>Draft</option>
              <option value='publish'>Published</option>
            </select>
          </div>

          <div className='flex items-center gap-2 pt-8'>
            <input
              type='checkbox'
              id='is_featured'
              checked={formData.is_featured}
              onChange={(e) =>
                setFormData({ ...formData, is_featured: e.target.checked })
              }
              className='h-5 w-5 rounded'
            />
            <label
              htmlFor='is_featured'
              className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'
            >
              Featured
            </label>
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Tags
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className='flex-1 rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
              placeholder='Add a tag and press Enter'
            />
            <button
              type='button'
              onClick={handleAddTag}
              className='rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
            >
              Add
            </button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-2'>
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className='flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag(tag)}
                    className='ml-1 hover:text-blue-600'
                  >
                    <BiX size={16} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded-lg border border-neutral-300 px-6 py-2 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50'
          >
            {isSubmitting ? 'Saving...' : blog ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default BlogForm;
