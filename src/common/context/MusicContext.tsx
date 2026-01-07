import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

interface MusicContextType {
  isPlaying: boolean;
  isEnabled: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Check localStorage for music preference
    const musicEnabled = localStorage.getItem('musicEnabled') === 'true';
    setIsEnabled(musicEnabled);

    if (musicEnabled) {
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

      // Try autoplay after user interaction
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

      // Try immediate autoplay
      void tryAutoplay();

      // Also try after user gesture
      window.addEventListener('click', onFirstUserGesture, { once: true });
      window.addEventListener('keydown', onFirstUserGesture, { once: true });

      return () => {
        audio.pause();
        audioRef.current = null;
        window.removeEventListener('click', onFirstUserGesture);
        window.removeEventListener('keydown', onFirstUserGesture);
      };
    }
  }, [isEnabled]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      // Initialize audio if not already done
      const newAudio = new Audio('/background_song.mp3');
      newAudio.loop = true;
      newAudio.preload = 'auto';
      newAudio.volume = 0.15;
      audioRef.current = newAudio;

      if (isPlaying) {
        newAudio.pause();
        setIsPlaying(false);
      } else {
        try {
          await newAudio.play();
          setIsPlaying(true);
          setIsBlocked(false);
        } catch {
          setIsBlocked(true);
        }
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
      }
    }
  };

  const enable = () => {
    setIsEnabled(true);
    localStorage.setItem('musicEnabled', 'true');
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsBlocked(true);
      });
    }
  };

  const disable = () => {
    setIsEnabled(false);
    localStorage.setItem('musicEnabled', 'false');
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isEnabled,
        toggle,
        enable,
        disable,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
