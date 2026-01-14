interface YouTubeEmbedProps {
  url: string;
  title?: string;
  width?: string;
  height?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  title = 'YouTube video player',
  width = '100%',
  height = '400px',
}) => {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className='my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'>
        <p className='font-medium'>Invalid YouTube URL</p>
        <p className='text-sm'>{url}</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className='my-6 overflow-hidden rounded-lg'>
      <div className='relative aspect-video w-full'>
        <iframe
          src={embedUrl}
          title={title}
          width={width}
          height={height}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='absolute inset-0 h-full w-full rounded-lg'
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
