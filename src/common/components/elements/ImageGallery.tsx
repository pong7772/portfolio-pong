import { useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';

import Image from './Image';

interface ImageGalleryProps {
  images?: string[];
  featuredImage?: string;
  title?: string;
}

const ImageGallery = ({
  images = [],
  featuredImage,
  title,
}: ImageGalleryProps) => {
  // Filter out empty/null images
  const validImages = images.filter((img) => img && img.trim() !== '');

  // Combine featured image with additional images
  const allImages = featuredImage
    ? [featuredImage, ...validImages]
    : validImages;

  if (allImages.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  if (allImages.length === 1) {
    // Single image - no gallery needed
    return (
      <div className='relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-[21/9]'>
        <Image
          src={allImages[0]}
          alt={title || 'Image'}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          priority
        />
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery Display */}
      <div className='space-y-4'>
        {/* Main Image */}
        <div
          className='group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl lg:aspect-[21/9]'
          onClick={() => setIsFullscreen(true)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role='button'
          aria-label='Click to view fullscreen gallery'
        >
          <Image
            src={allImages[currentIndex]}
            alt={`${title || 'Image'} ${currentIndex + 1}`}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            priority={currentIndex === 0}
          />

          {/* Navigation Arrows - Show on hover */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100'
                aria-label='Previous image'
              >
                <BiChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100'
                aria-label='Next image'
              >
                <BiChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100'>
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {allImages.length > 1 && (
          <div className='flex gap-2 overflow-x-auto pb-2'>
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative h-20 min-w-[80px] flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  currentIndex === index
                    ? 'border-blue-500 ring-2 ring-blue-500'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4'
          onClick={() => setIsFullscreen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className='absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20'
            aria-label='Close gallery'
          >
            <BiX size={32} />
          </button>

          {/* Main Image */}
          <div className='relative h-full w-full max-w-7xl'>
            <Image
              src={allImages[currentIndex]}
              alt={`${title || 'Image'} ${currentIndex + 1}`}
              fill
              className='object-contain'
              priority
            />

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20'
              aria-label='Previous image'
            >
              <BiChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20'
              aria-label='Next image'
            >
              <BiChevronRight size={32} />
            </button>

            {/* Image Counter */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-2 text-white'>
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
