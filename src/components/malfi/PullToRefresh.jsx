import { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const THRESHOLD = 70;

export default function PullToRefresh({ onRefresh, children }) {
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (startY.current === null) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0 && window.scrollY === 0) {
        setPulling(true);
        setPullY(Math.min(delta * 0.5, THRESHOLD + 20));
      }
    };

    const onTouchEnd = async () => {
      if (pullY >= THRESHOLD) {
        setRefreshing(true);
        setPullY(40);
        await onRefresh?.();
        setRefreshing(false);
      }
      setPulling(false);
      setPullY(0);
      startY.current = null;
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [pullY, onRefresh]);

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center z-10 transition-all duration-200 pointer-events-none"
        style={{
          top: -48,
          transform: `translateY(${pulling || refreshing ? pullY + 48 : 0}px)`,
          opacity: pullY > 10 ? Math.min(pullY / THRESHOLD, 1) : 0,
        }}
      >
        <div className="w-9 h-9 rounded-full bg-white shadow-md border border-olive/15 flex items-center justify-center">
          <RefreshCw
            className={`w-4 h-4 text-olive ${refreshing ? 'animate-spin' : ''}`}
            style={{ transform: `rotate(${(pullY / THRESHOLD) * 180}deg)` }}
          />
        </div>
      </div>
      <div style={{ transform: `translateY(${pulling || refreshing ? pullY : 0}px)`, transition: pulling ? 'none' : 'transform 0.3s ease' }}>
        {children}
      </div>
    </div>
  );
}