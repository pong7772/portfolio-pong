import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { toast } from 'sonner';

import Card from '@/common/components/elements/Card';
import { StoryFormData } from '@/common/types/stories';
import { createStory } from '@/services/stories';

interface StoryUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const StoryUploadForm = ({ onSuccess, onCancel }: StoryUploadFormProps) => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    description: '',
    image: '',
    link: '',
    order: 0,
    is_show: true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

      // For now, we'll use a base64 image or upload to a service
      // You can integrate with services like Cloudinary, S3, etc.
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);

      // Alternative: Upload to a service
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // setFormData({ ...formData, image: data.url });
      // setImagePreview(data.url);

      toast.success('Image loaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setIsUploading(false);
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
      await createStory(formData);
      toast.success('Story created successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to create story');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className='p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-xl font-bold'>Add New Story</h3>
        <button
          onClick={onCancel}
          className='rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        >
          <BiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Image Upload */}
        <div>
          <label className='mb-2 block text-sm font-medium'>
            Image <span className='text-red-500'>*</span>
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
            disabled={isUploading}
          />
          {imagePreview && (
            <div className='relative mt-2 aspect-video w-full overflow-hidden rounded-lg'>
              <img
                src={imagePreview}
                alt='Preview'
                className='h-full w-full object-cover'
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className='mb-2 block text-sm font-medium'>
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
            placeholder='Enter story title'
            required
            disabled={isUploading}
          />
        </div>

        {/* Description */}
        <div>
          <label className='mb-2 block text-sm font-medium'>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
            placeholder='Enter story description'
            rows={3}
            disabled={isUploading}
          />
        </div>

        {/* Link */}
        <div>
          <label className='mb-2 block text-sm font-medium'>
            Custom Link (Optional)
          </label>
          <input
            type='url'
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
            placeholder='https://example.com'
            disabled={isUploading}
          />
          <p className='mt-1 text-xs text-neutral-500'>
            Leave empty to use default story detail page
          </p>
        </div>

        {/* Order */}
        <div>
          <label className='mb-2 block text-sm font-medium'>Order</label>
          <input
            type='number'
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: Number(e.target.value) })
            }
            className='w-full rounded-lg border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900'
            min='0'
            disabled={isUploading}
          />
          <p className='mt-1 text-xs text-neutral-500'>
            Lower numbers appear first in the slideshow
          </p>
        </div>

        {/* Visibility */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='is_show'
            checked={formData.is_show}
            onChange={(e) =>
              setFormData({ ...formData, is_show: e.target.checked })
            }
            className='h-4 w-4 rounded'
            disabled={isUploading}
          />
          <label htmlFor='is_show' className='text-sm'>
            Show on homepage
          </label>
        </div>

        {/* Submit Buttons */}
        <div className='flex gap-3'>
          <button
            type='submit'
            disabled={isUploading}
            className='flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isUploading ? 'Creating...' : 'Create Story'}
          </button>
          <button
            type='button'
            onClick={onCancel}
            disabled={isUploading}
            className='rounded-lg border border-neutral-300 px-4 py-2 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default StoryUploadForm;
