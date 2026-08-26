'use client';

import { useEffect, useState } from 'react';

const MIN_DISPLAY_MS = 1700;
const EXIT_MS = 600;
const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const start = Date.now();
    let exitTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    // A hard MIN_DISPLAY_MS floor guarantees every visitor actually sees the
    // draw-in at least once — on a fast connection `load` can fire almost
    // instantly, which would otherwise flash the screen for one frame.
    const beginExit = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      exitTimer = setTimeout(() => {
        setExiting(true);
        removeTimer = setTimeout(() => setMounted(false), EXIT_MS);
      }, wait);
    };

    if (document.readyState === 'complete') {
      beginExit();
    } else {
      window.addEventListener('load', beginExit);
    }

    return () => {
      window.removeEventListener('load', beginExit);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`pz-loader${exiting ? ' pz-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Pozozo Sports"
    >
      <div className="pz-loader__glow" aria-hidden="true" />
      <div className="pz-loader__mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="120" height="120">
          <circle
            className="pz-loader__ring"
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="#F2900E"
            strokeWidth={2.4}
            strokeLinecap="round"
            style={{ strokeDasharray: RING_CIRCUMFERENCE, '--pz-dash': RING_CIRCUMFERENCE } as React.CSSProperties}
          />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" className="pz-loader__logo" />
      </div>
    </div>
  );
}
