'use client';

import { useEffect, useRef, useState } from 'react';

// Manually measured length of MARK_PATH's combined subpaths (circle + seam) —
// used as the SSR-safe fallback until the client measures the real value.
const FALLBACK_DASH = 600;
const MIN_DISPLAY_MS = 1700;
const EXIT_MS = 600;

const MARK_PATH =
  'M50,4 A46,46 0 1,0 50,96 A46,46 0 1,0 50,4 M24,28 H76 L36,60 H76 V72 H24 L64,40 H24 Z';

export function LoadingScreen() {
  const [dash, setDash] = useState(FALLBACK_DASH);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const strokeRef = useRef<SVGPathElement>(null);

  // Measure the real path length once on the client so the draw animation
  // lines up exactly with the mark instead of guessing a dash length.
  useEffect(() => {
    if (strokeRef.current) {
      const len = strokeRef.current.getTotalLength();
      if (len > 0) setDash(len);
    }
  }, []);

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
          <path className="pz-loader__fill" d={MARK_PATH} fillRule="evenodd" fill="#EEF1F5" />
          <path
            ref={strokeRef}
            className="pz-loader__stroke"
            d={MARK_PATH}
            fill="none"
            stroke="#EEF1F5"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: dash, '--pz-dash': dash } as React.CSSProperties}
          />
        </svg>
      </div>
    </div>
  );
}
