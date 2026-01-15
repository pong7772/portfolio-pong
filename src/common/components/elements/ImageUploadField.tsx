import { useState } from 'react';
import { BiImage, BiLink, BiTrash, BiUpload, BiX } from 'react-icons/bi';
import { toast } from 'sonner';

import Image from './Image';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxSizeMB?: number;
  placeholder?: string;
  required?: boolean;
}

const ImageUploadField = ({
  label,
  value,
  onChange,
  maxSizeMB = 5,
  placeholder = 'https://example.com/image.jpg',
  required = false,
}: ImageUploadFieldProps) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image size should be less than ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        toast.success('Image uploaded successfully');
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
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

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    const isValidUrl =
      urlInput.trim().startsWith('http://') ||
      urlInput.trim().startsWith('https://') ||
      urlInput.trim().startsWith('data:image/');

    if (!isValidUrl) {
      toast.error('Please enter a valid image URL');
      return;
    }

    onChange(urlInput.trim());
    setUrlInput('');
    setShowUrlInput(false);
    toast.success('Image URL added');
  };

  const handleRemove = () => {
    onChange('');
    toast.success('Image removed');
  };

  const isValidImageUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.protocol === 'http:' ||
        urlObj.protocol === 'https:' ||
        url.startsWith('data:image/')
      );
    } catch {
      return url.startsWith('data:image/');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setShowUrlInput(!showUrlInput)}
            className='flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800'
          >
            <BiLink size={14} />
            {showUrlInput ? 'Cancel' : 'Add URL'}
          </button>
          {value && (
            <button
              type='button'
              onClick={handleRemove}
              className='flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20'
            >
              <BiTrash size={14} />
              Remove
            </button>
          )}
        </div>
      </div>

      {showUrlInput && (
        <div className='flex gap-2'>
          <input
            type='url'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder={placeholder}
            className='flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-800'
          />
          <button
            type='button'
            onClick={handleAddUrl}
            className='rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600'
          >
            Add
          </button>
        </div>
      )}

      {/* Upload Area or Image Preview */}
      {value ? (
        <div className='relative'>
          <div className='relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700'>
            <Image
              src={value}
              alt={label}
              fill
              className='object-cover'
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.png';
              }}
            />
          </div>
          <div className='mt-2 flex items-center justify-between text-xs text-neutral-500'>
            <span>
              {value.startsWith('data:') ? 'Uploaded Image' : 'Image URL'}
            </span>
            <button
              type='button'
              onClick={handleRemove}
              className='text-red-500 hover:text-red-600'
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-neutral-300 hover:border-indigo-400 dark:border-neutral-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <BiUpload size={32} className='mx-auto mb-2 text-neutral-400' />
          <p className='mb-1 text-sm text-neutral-600 dark:text-neutral-400'>
            Drag and drop an image here, or click to select
          </p>
          <p className='text-xs text-neutral-500'>
            Supports JPG, PNG, GIF up to {maxSizeMB}MB
          </p>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileInput}
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            disabled={isUploading}
          />
          {isUploading && (
            <div className='absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-indigo-500' />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
