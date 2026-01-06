import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

const useIsMobile = () => {
  const { width } = useWindowSize();
  // Align with Tailwind's md: breakpoint (768px) to match layout behavior
  const [isMobile, setIsMobile] = useState(width < 768);

  useEffect(() => {
    // Use 768px to match Tailwind's md: breakpoint for consistent behavior
    setIsMobile(width < 768);
  }, [width]);

  return isMobile;
};

export default useIsMobile;
