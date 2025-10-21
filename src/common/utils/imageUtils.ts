/**
 * Utility functions for handling images, especially base64 encoded images
 */

/**
 * Check if an image source is a base64 data URL
 */
export const isBase64Image = (src: string | null | undefined): boolean => {
  if (!src) return false;
  return src.startsWith('data:image/');
};

/**
 * Get image optimization settings based on image type
 */
export const getImageOptimizationSettings = (
  src: string | null | undefined,
) => {
  const isBase64 = isBase64Image(src);

  return {
    unoptimized: isBase64,
    priority: !isBase64, // Only prioritize non-base64 images
    quality: isBase64 ? 100 : 85, // Higher quality for base64 to avoid double compression
  };
};

/**
 * Validate and clean base64 image data
 */
export const validateBase64Image = (src: string): string | null => {
  if (!src || !src.startsWith('data:image/')) {
    return null;
  }

  // Check if base64 data is too large (over 1MB)
  const base64Data = src.split(',')[1];
  if (base64Data && base64Data.length > 1.5 * 1024 * 1024) {
    // 1.5MB limit
    console.warn('Base64 image is too large, using placeholder instead');
    return null;
  }

  return src;
};

/**
 * Get fallback image for stories
 */
export const getStoryFallbackImage = (): string => {
  return '/images/placeholder.png';
};

/**
 * Debug image loading issues
 */
export const debugImageSource = (
  src: string | null | undefined,
  component: string,
) => {
  if (process.env.NODE_ENV === 'development') {
    if (!src) {
      console.warn(`[${component}] Image source is empty`);
    } else if (isBase64Image(src)) {
      const size = src.length;
      const sizeKB = Math.round(size / 1024);
      console.log(`[${component}] Base64 image detected, size: ${sizeKB}KB`);

      if (sizeKB > 500) {
        console.warn(`[${component}] Large base64 image detected: ${sizeKB}KB`);
      }
    } else {
      console.log(`[${component}] External image: ${src}`);
    }
  }
};
