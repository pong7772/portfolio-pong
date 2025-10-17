import { useEffect, useRef, useState } from 'react';
import {
  BsPauseFill as PauseIcon,
  BsPlayFill as PlayIcon,
} from 'react-icons/bs';

const BackgroundAudioButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio('/background_song.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.15;
    audioRef.current = audio;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
        setIsPlaying(false);
      }
    };

    // Try immediate autoplay, and also retry after user gesture to satisfy policies
    void tryAutoplay();
    const onFirstUserGesture = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
      } catch {
        // ignore
      } finally {
        window.removeEventListener('click', onFirstUserGesture);
        window.removeEventListener('keydown', onFirstUserGesture);
      }
    };
    window.addEventListener('click', onFirstUserGesture, { once: true });
    window.addEventListener('keydown', onFirstUserGesture, { once: true });
    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener('click', onFirstUserGesture);
      window.removeEventListener('keydown', onFirstUserGesture);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
      setIsBlocked(false);
    } catch {
      setIsBlocked(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className='flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800'
      aria-label={
        isPlaying ? 'Pause background music' : 'Play background music'
      }
    >
      {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      <span>
        {isBlocked ? 'Play music' : isPlaying ? 'Music on' : 'Music off'}
      </span>
    </button>
  );
};

export default BackgroundAudioButton;
