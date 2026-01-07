import {
  BsPauseFill as PauseIcon,
  BsPlayFill as PlayIcon,
} from 'react-icons/bs';

import { useMusic } from '@/common/context/MusicContext';

const BackgroundAudioButton = () => {
  const { isPlaying, isEnabled, toggle, enable } = useMusic();

  const handleClick = () => {
    if (!isEnabled) {
      enable();
    } else {
      toggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800'
      aria-label={
        isPlaying ? 'Pause background music' : 'Play background music'
      }
    >
      {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      <span>
        {!isEnabled ? 'Enable music' : isPlaying ? 'Music on' : 'Music off'}
      </span>
    </button>
  );
};

export default BackgroundAudioButton;
