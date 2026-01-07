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
    // But don't autoplay - only play when user explicitly enables it
    const musicEnabled = localStorage.getItem('musicEnabled') === 'true';
    setIsEnabled(musicEnabled);

    // Initialize audio only if enabled, but don't play automatically
    if (musicEnabled && !audioRef.current) {
      const audio = new Audio('/background_song.mp3');
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.15;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

  const enable = async () => {
    setIsEnabled(true);
    localStorage.setItem('musicEnabled', 'true');

    // Initialize audio if not already done
    if (!audioRef.current) {
      const audio = new Audio('/background_song.mp3');
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.15;
      audioRef.current = audio;
    }

    // Play music when user explicitly enables it
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setIsBlocked(false);
    } catch (error) {
      setIsBlocked(true);
      setIsPlaying(false);
      console.error('Failed to play music:', error);
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
