import { useEffect, useState } from 'react';

export const useVisitorCount = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    let lastSentAt = 0;

    const handleAnyInteraction = async () => {
      const now = Date.now();
      // Throttle to avoid excessive requests when user performs many actions quickly
      if (now - lastSentAt < 1000) return;
      lastSentAt = now;
      try {
        await fetch('/api/visitors', { method: 'POST' });
      } catch {
        void 0;
      } finally {
        void fetchCount();
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

    // Count every user interaction (click/keydown) with throttling
    window.addEventListener('click', handleAnyInteraction);
    window.addEventListener('keydown', handleAnyInteraction);
    // Fetch current count for display immediately
    void fetchCount();
    const id = setInterval(fetchCount, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener('click', handleAnyInteraction);
      window.removeEventListener('keydown', handleAnyInteraction);
    };
  }, []);

  return count;
};
