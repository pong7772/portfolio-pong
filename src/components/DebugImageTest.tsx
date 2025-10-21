'use client';

import { useState } from 'react';
import Image from '@/common/components/elements/Image';

const DebugImageTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const testImages = [
    {
      name: 'Placeholder',
      src: '/images/placeholder.png',
    },
    {
      name: 'External Dev.to',
      src: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fz58l2j523jclxaqldoag.png',
    },
    {
      name: 'Base64 Test',
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VEVTVDwvdGV4dD48L3N2Zz4=',
    },
  ];

  const addResult = (message: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  return (
    <div className='space-y-8 p-8'>
      <h2 className='text-2xl font-bold'>Image Loading Debug Test</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {testImages.map((image, index) => (
          <div key={index} className='rounded-lg border p-4'>
            <h3 className='mb-2 font-semibold'>{image.name}</h3>
            <div className='relative h-32 w-full rounded bg-gray-100'>
              <Image
                src={image.src}
                alt={`Test ${image.name}`}
                fill
                className='object-cover'
                onLoad={() => addResult(`✅ ${image.name} loaded successfully`)}
                onError={() => addResult(`❌ ${image.name} failed to load`)}
              />
            </div>
            <p className='mt-2 break-all text-xs'>
              {image.src.substring(0, 50)}...
            </p>
          </div>
        ))}
      </div>

      <div className='rounded bg-gray-100 p-4'>
        <h3 className='mb-2 font-semibold'>Debug Log:</h3>
        <div className='max-h-40 space-y-1 overflow-y-auto text-sm'>
          {testResults.map((result, index) => (
            <div key={index} className='font-mono'>
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebugImageTest;
