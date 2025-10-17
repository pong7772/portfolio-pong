import { useEffect, useState } from 'react';

export const useVisitorCount = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    const markVisitedOncePerSession = async () => {
      try {
        const hasVisited = sessionStorage.getItem('site_visited');
        if (!hasVisited) {
          await fetch('/api/visitors', { method: 'POST' });
          sessionStorage.setItem('site_visited', '1');
        }
      } catch {
        void 0;
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

    markVisitedOncePerSession().then(fetchCount);
    const id = setInterval(fetchCount, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return count;
};
