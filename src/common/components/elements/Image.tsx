'use client';

import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

import cn from '@/common/libs/cn';

type ImageProps = {
  rounded?: string;
  width?: number | null;
  height?: number | null;
} & NextImageProps;

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, width, height, ...rest } = props;
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={clsx(
        'next-image-wrapper overflow-hidden',
        isLoading ? 'animate-pulse' : '',
        rounded,
      )}
    >
      <NextImage
        className={cn(
          'duration-700 ease-in-out',
          isLoading
            ? 'scale-[1.02] blur-xl grayscale'
            : 'scale-100 blur-0 grayscale-0',
          rounded,
          className,
        )}
        src={src}
        alt={alt}
        loading='lazy'
        quality={100}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        onLoad={() => setLoading(false)}
        width={width || undefined}
        height={height || undefined}
        unoptimized={false}
        {...rest}
      />
    </div>
  );
};
export default Image;
