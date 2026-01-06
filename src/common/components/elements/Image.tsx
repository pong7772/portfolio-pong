'use client';

import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import cn from '@/common/libs/cn';

type ImageProps = {
  rounded?: string;
  width?: number | null;
  height?: number | null;
  fill?: boolean;
} & NextImageProps;

const Image = (props: ImageProps) => {
  const {
    alt,
    src,
    className,
    rounded,
    width,
    height,
    fill,
    priority,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const defaultImage = '/images/placeholder.png';

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && imgSrc !== defaultImage) {
      setHasError(true);
      setImgSrc(defaultImage);
    }
  };

  // Determine if image should be unoptimized (for external URLs or problematic sources)
  const shouldUnoptimize =
    typeof imgSrc === 'string' &&
    (imgSrc.startsWith('http://') ||
      imgSrc.startsWith('https://') ||
      imgSrc.includes('data:'));

  return (
    <div
      className={clsx(
        'next-image-wrapper',
        fill ? 'relative h-full w-full' : 'overflow-hidden',
        rounded,
      )}
    >
      <NextImage
        className={cn(rounded, className)}
        src={imgSrc}
        alt={alt || 'Image'}
        loading={priority ? undefined : 'lazy'}
        quality={100}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        width={fill ? undefined : width || undefined}
        height={fill ? undefined : height || undefined}
        fill={fill}
        priority={priority}
        unoptimized={shouldUnoptimize}
        onError={handleError}
        {...rest}
      />
    </div>
  );
};
export default Image;
