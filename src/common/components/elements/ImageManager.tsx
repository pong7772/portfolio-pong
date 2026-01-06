import { useState } from 'react';
import { BiImage, BiLink, BiTrash, BiUpload } from 'react-icons/bi';
import { toast } from 'sonner';

import Image from './Image';

interface ImageItem {
  id: string;
  url: string;
  type: 'url' | 'upload';
}

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  label?: string;
}

const ImageManager = ({
  images,
  onChange,
  maxImages = 10,
  maxSizeMB = 5,
  label = 'Images',
}: ImageManagerProps) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const imageList: ImageItem[] = images.map((url, index) => ({
    id: `img-${index}`,
    url,
    type: url.startsWith('data:') ? 'upload' : 'url',
  }));

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    if (!isValidImageUrl(urlInput.trim())) {
      toast.error('Please enter a valid image URL');
      return;
    }

    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    if (images.includes(urlInput.trim())) {
      toast.error('This image is already added');
      return;
    }

    onChange([...images, urlInput.trim()]);
    setUrlInput('');
    setShowUrlInput(false);
    toast.success('Image URL added');
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

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image size should be less than ${maxSizeMB}MB`);
      return;
    }

    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (!images.includes(base64String)) {
          onChange([...images, base64String]);
          toast.success('Image uploaded successfully');
        } else {
          toast.error('This image is already added');
        }
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

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (images.length < maxImages) {
        handleFileUpload(file);
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (images.length < maxImages) {
        handleFileUpload(file);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success('Image removed');
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
          <BiImage className='mr-2 inline' size={16} />
          {label} ({images.length}/{maxImages})
        </label>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setShowUrlInput(!showUrlInput)}
            className='flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800'
            disabled={images.length >= maxImages}
          >
            <BiLink size={14} />
            Add URL
          </button>
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
            placeholder='https://example.com/image.jpg'
            className='flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-800'
          />
          <button
            type='button'
            onClick={handleAddUrl}
            className='rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
          >
            Add
          </button>
          <button
            type='button'
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput('');
            }}
            className='rounded-lg border border-neutral-300 px-4 py-2 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800'
          >
            Cancel
          </button>
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-neutral-300 hover:border-blue-400 dark:border-neutral-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <BiUpload size={32} className='mx-auto mb-2 text-neutral-400' />
          <p className='mb-1 text-sm text-neutral-600 dark:text-neutral-400'>
            Drag and drop images here, or click to select
          </p>
          <p className='text-xs text-neutral-500'>
            Supports JPG, PNG, GIF up to {maxSizeMB}MB each
          </p>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileInput}
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            disabled={isUploading || images.length >= maxImages}
          />
        </div>
      )}

      {/* Image Grid */}
      {imageList.length > 0 && (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {imageList.map((image, index) => (
            <div
              key={image.id}
              className='group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700'
            >
              <Image
                src={image.url}
                alt={`Image ${index + 1}`}
                fill
                className='object-cover'
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/images/placeholder.png';
                }}
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100'
                title='Remove image'
              >
                <BiTrash size={14} />
              </button>
              <div className='absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                {image.type === 'upload' ? 'Uploaded' : 'URL'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageManager;
