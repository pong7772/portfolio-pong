import { useState } from 'react';
import { BiImage, BiX } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import DocumentManager from '@/common/components/elements/DocumentManager';
import ImageManager from '@/common/components/elements/ImageManager';
import ImageUploadField from '@/common/components/elements/ImageUploadField';
import RichTextEditor from '@/common/components/elements/RichTextEditor';
import {
  PPDPost,
  PPDPostFormData,
  createPPDPost,
  updatePPDPost,
} from '@/services/ppd-posts';

interface PPDPostFormProps {
  post?: PPDPost;
  onSuccess: () => void;
  onCancel: () => void;
}

const PPDPostForm = ({ post, onSuccess, onCancel }: PPDPostFormProps) => {
  const [formData, setFormData] = useState<PPDPostFormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    thumbnail_url: post?.thumbnail_url || '',
    featured_image_url: post?.featured_image_url || '',
    images: post?.images ? JSON.parse(post.images) : [],
    documents: post?.documents ? JSON.parse(post.documents) : [],
    youtube_video_url: post?.youtube_video_url || '',
    status: (post?.status as 'draft' | 'publish') || 'draft',
    is_featured: post?.is_featured || false,
    tags: post?.tags ? JSON.parse(post.tags) : [],
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
    if (!post && !formData.slug) {
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

      // Clean up the data before sending
      const submitData: any = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        status: formData.status,
        is_featured: formData.is_featured,
      };

      // Add optional fields only if they have values
      if (formData.excerpt && formData.excerpt.trim()) {
        submitData.excerpt = formData.excerpt.trim();
      }
      if (formData.thumbnail_url && formData.thumbnail_url.trim()) {
        submitData.thumbnail_url = formData.thumbnail_url.trim();
      }
      if (formData.featured_image_url && formData.featured_image_url.trim()) {
        submitData.featured_image_url = formData.featured_image_url.trim();
      }
      if (formData.youtube_video_url && formData.youtube_video_url.trim()) {
        submitData.youtube_video_url = formData.youtube_video_url.trim();
      }
      if (
        formData.images &&
        Array.isArray(formData.images) &&
        formData.images.length > 0
      ) {
        submitData.images = formData.images;
      }
      if (
        formData.documents &&
        Array.isArray(formData.documents) &&
        formData.documents.length > 0
      ) {
        submitData.documents = formData.documents;
      }
      if (
        formData.tags &&
        Array.isArray(formData.tags) &&
        formData.tags.length > 0
      ) {
        submitData.tags = formData.tags;
      }
      if (formData.status === 'publish') {
        submitData.published_at = new Date().toISOString();
      }

      if (post) {
        await updatePPDPost(post.id, submitData);
        toast.success('PPD post updated successfully');
      } else {
        await createPPDPost(submitData);
        toast.success('PPD post created successfully');
      }
      onSuccess();
    } catch (error: any) {
      console.error('Error saving PPD post:', error);
      const errorMessage = error.message || 'Failed to save PPD post';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className='border-indigo-200 p-6 dark:border-indigo-800'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900'>
            <BiImage
              className='text-indigo-600 dark:text-indigo-400'
              size={20}
            />
          </div>
          <h3 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
            {post ? 'Edit PPD Post' : 'Create New PPD Post'}
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
          <ImageUploadField
            label='Thumbnail (for card display)'
            value={formData.thumbnail_url || ''}
            onChange={(value) =>
              setFormData({ ...formData, thumbnail_url: value })
            }
            placeholder='https://example.com/thumbnail.jpg'
          />
        </div>

        <div>
          <ImageUploadField
            label='Featured Image'
            value={formData.featured_image_url || ''}
            onChange={(value) =>
              setFormData({ ...formData, featured_image_url: value })
            }
            placeholder='https://example.com/image.jpg'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            YouTube Video URL
          </label>
          <input
            type='url'
            value={formData.youtube_video_url}
            onChange={(e) =>
              setFormData({ ...formData, youtube_video_url: e.target.value })
            }
            className='w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800'
            placeholder='https://www.youtube.com/watch?v=... or https://youtu.be/...'
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
          <DocumentManager
            documents={formData.documents || []}
            onChange={(documents) => setFormData({ ...formData, documents })}
            maxDocuments={10}
            maxSizeMB={10}
            label='Documents'
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
            placeholder='Brief description of the PPD post...'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            Content <span className='text-red-500'>*</span>
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder='Write your PPD post content here...'
            disabled={isSubmitting}
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
              className='rounded-lg bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600'
            >
              Add
            </button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-2'>
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className='flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag(tag)}
                    className='ml-1 hover:text-indigo-600'
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
            className='rounded-lg bg-indigo-500 px-6 py-2 text-white transition-colors hover:bg-indigo-600 disabled:opacity-50'
          >
            {isSubmitting ? 'Saving...' : post ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PPDPostForm;
