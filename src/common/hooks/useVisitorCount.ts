import { useEffect, useState } from 'react';

export const useVisitorCount = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    let handledInteraction = false;

    const handleFirstInteraction = async () => {
      if (handledInteraction) return;
      handledInteraction = true;
      try {
        const hasVisited = sessionStorage.getItem('site_visited');
        if (!hasVisited) {
          await fetch('/api/visitors', { method: 'POST' });
          sessionStorage.setItem('site_visited', '1');
        }
      } catch {
        void 0;
      } finally {
        void fetchCount();
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    const fetchCount = async () => {
      try {
        const res = await fetch('/api/visitors');
        const data = await res.json();
        if (!cancelled && typeof data?.count === 'number') setCount(data.count);
      } catch {
        void 0;
      }
    };

    // Count only after first user interaction (click/keydown)
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    // Still fetch current count for display immediately
    void fetchCount();
    const id = setInterval(fetchCount, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return count;
};
