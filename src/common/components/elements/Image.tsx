'use client';

import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import cn from '@/common/libs/cn';

type ImageProps = {
  rounded?: string;
  width?: number | null;
  height?: number | null;
} & NextImageProps;

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, width, height, ...rest } = props;

  return (
    <div className={clsx('next-image-wrapper overflow-hidden', rounded)}>
      <NextImage
        className={cn('duration-700 ease-in-out', rounded, className)}
        src={src}
        alt={alt}
        loading='lazy'
        quality={100}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        width={width || undefined}
        height={height || undefined}
        unoptimized={false}
        {...rest}
      />
    </div>
  );
};
export default Image;
