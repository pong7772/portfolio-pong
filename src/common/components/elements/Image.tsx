'use client';

import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

import cn from '@/common/libs/cn';
import {
  debugImageSource,
  getImageOptimizationSettings,
  validateBase64Image,
} from '@/common/utils/imageUtils';

type ImageProps = {
  rounded?: string;
  width?: number | null;
  height?: number | null;
} & NextImageProps;

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, width, height, ...rest } = props;
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Debug logging for image issues
  debugImageSource(src, 'Image');

  // Validate and clean the image source
  const validatedSrc = validateBase64Image(src as string) || src;
  const optimizationSettings = getImageOptimizationSettings(validatedSrc);

  // Convert src to string for display purposes
  const srcString = typeof validatedSrc === 'string' ? validatedSrc : '';

  const handleLoad = () => {
    setLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setLoading(false);
    setHasError(true);
    console.error('Image failed to load:', srcString);
  };

  return (
    <div
      className={clsx(
        'next-image-wrapper overflow-hidden',
        isLoading ? 'animate-pulse' : '',
        rounded,
      )}
    >
      {hasError ? (
        <div className='flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800'>
          <div className='text-center text-neutral-500 dark:text-neutral-400'>
            <div className='text-sm'>Image not available</div>
            {srcString && (
              <div className='mt-1 break-all text-xs opacity-75'>
                {srcString.length > 50
                  ? `${srcString.substring(0, 50)}...`
                  : srcString}
              </div>
            )}
          </div>
        </div>
      ) : (
        <NextImage
          className={cn(
            'duration-700 ease-in-out',
            isLoading
              ? 'scale-[1.02] blur-xl grayscale'
              : 'scale-100 blur-0 grayscale-0',
            rounded,
            className,
          )}
          src={validatedSrc}
          alt={alt}
          loading='lazy'
          quality={optimizationSettings.quality}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          onLoad={handleLoad}
          onError={handleError}
          width={width || undefined}
          height={height || undefined}
          unoptimized={optimizationSettings.unoptimized}
          priority={optimizationSettings.priority}
          {...rest}
        />
      )}
    </div>
  );
};
export default Image;
