import { useState } from 'react';
import { BiImage, BiKey, BiLink, BiSort, BiUpload, BiX } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import ImageManager from '@/common/components/elements/ImageManager';
import RichTextEditor from '@/common/components/elements/RichTextEditor';
import { Story, StoryFormData } from '@/common/types/stories';
import { createStory, updateStory } from '@/services/stories';

interface EnhancedStoryUploadFormProps {
  story?: Story;
  onSuccess: () => void;
  onCancel: () => void;
}

const EnhancedStoryUploadForm = ({
  story,
  onSuccess,
  onCancel,
}: EnhancedStoryUploadFormProps) => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: story?.title || '',
    description: story?.description || '',
    image: story?.image || '',
    images: story?.images ? JSON.parse(story.images) : [],
    link: story?.link || '',
    order: story?.order || 0,
    is_show: story?.is_show ?? true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(story?.image || '');
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);

      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);

      toast.success('Image loaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsUploading(true);
      const submitData = {
        ...formData,
        images:
          formData.images && formData.images.length > 0
            ? formData.images
            : undefined,
      };
      if (story) {
        await updateStory(story.id, submitData);
        toast.success('Story updated successfully');
      } else {
        await createStory(submitData);
        toast.success('Story created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(story ? 'Failed to update story' : 'Failed to create story');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className='border-green-200 p-6 dark:border-green-800'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
            <BiImage className='text-green-600 dark:text-green-400' size={20} />
          </div>
          <h3 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
            {story ? 'Edit Story' : 'Add New Story'}
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
        {/* Image Upload Section */}
        <div>
          <label className='mb-3 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            <BiImage className='mr-2 inline' size={16} />
            Story Image <span className='text-red-500'>*</span>
          </label>

          {/* Drag and Drop Area */}
          <div
            className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              dragActive
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-neutral-300 hover:border-green-400 dark:border-neutral-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {imagePreview || formData.image ? (
              <div className='relative'>
                <img
                  src={imagePreview || formData.image}
                  alt='Preview'
                  className='mx-auto h-48 w-48 rounded-full border-4 border-green-500 object-cover'
                />
                <button
                  type='button'
                  onClick={() => {
                    setImagePreview('');
                    setFormData({ ...formData, image: '' });
                  }}
                  className='absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                >
                  <BiX size={16} />
                </button>
              </div>
            ) : (
              <div>
                <BiUpload size={48} className='mx-auto mb-4 text-neutral-400' />
                <p className='mb-2 text-neutral-600 dark:text-neutral-400'>
                  Drag and drop an image here, or click to select
                </p>
                <p className='text-sm text-neutral-500'>
                  Supports JPG, PNG, GIF up to 5MB
                </p>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                  disabled={isUploading}
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <ImageManager
            images={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            maxImages={10}
            label='Additional Images'
          />
        </div>

        {/* Form Fields Grid */}
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Title */}
          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Story Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className='w-full rounded-lg border border-neutral-300 bg-white p-3 text-neutral-800 placeholder-neutral-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-green-400 dark:focus:ring-green-900'
              placeholder='Enter a captivating story title'
              required
              disabled={isUploading}
            />
          </div>

          {/* Description */}
          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Description
            </label>
            <RichTextEditor
              value={formData.description || ''}
              onChange={(description) =>
                setFormData({ ...formData, description })
              }
              placeholder='Tell the story behind this image...'
              disabled={isUploading}
            />
          </div>

          {/* Link */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              <BiLink className='mr-2 inline' size={16} />
              Custom Link
            </label>
            <input
              type='url'
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className='w-full rounded-lg border border-neutral-300 bg-white p-3 text-neutral-800 placeholder-neutral-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-green-400 dark:focus:ring-green-900'
              placeholder='https://example.com'
              disabled={isUploading}
            />
            <p className='mt-1 text-xs text-neutral-500'>
              Leave empty to use default story detail page
            </p>
          </div>

          {/* Order */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              <BiSort className='mr-2 inline' size={16} />
              Display Order
            </label>
            <input
              type='number'
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: Number(e.target.value) })
              }
              className='w-full rounded-lg border border-neutral-300 bg-white p-3 text-neutral-800 placeholder-neutral-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-green-400 dark:focus:ring-green-900'
              min='0'
              disabled={isUploading}
            />
            <p className='mt-1 text-xs text-neutral-500'>
              Lower numbers appear first
            </p>
          </div>
        </div>

        {/* Visibility Toggle */}
        <div className='flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
            {formData.is_show ? (
              <BiKey className='text-green-600 dark:text-green-400' size={20} />
            ) : (
              <BiKey className='text-neutral-500' size={20} />
            )}
          </div>
          <div className='flex-1'>
            <label className='flex cursor-pointer items-center gap-3'>
              <input
                type='checkbox'
                checked={formData.is_show}
                onChange={(e) =>
                  setFormData({ ...formData, is_show: e.target.checked })
                }
                className='h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-2 focus:ring-green-200 dark:border-neutral-600'
                disabled={isUploading}
              />
              <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Show on homepage
              </span>
            </label>
            <p className='text-xs text-neutral-500'>
              Toggle visibility of this story on the main page
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 pt-4'>
          <button
            type='submit'
            disabled={isUploading}
            className='flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-green-900'
          >
            {isUploading ? (
              <div className='flex items-center justify-center gap-2'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                {story ? 'Updating Story...' : 'Creating Story...'}
              </div>
            ) : story ? (
              'Update Story'
            ) : (
              'Create Story'
            )}
          </button>
          <button
            type='button'
            onClick={onCancel}
            disabled={isUploading}
            className='rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800'
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EnhancedStoryUploadForm;
