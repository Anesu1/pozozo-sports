'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  type BallInstance,
  SIZE,
  createInstance,
  getEngine,
  getTexture,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  paintInstance,
  registerInstance,
  unregisterInstance,
} from './engine';

export interface Ball3DProps {
  src: string;
  alt: string;
  /** Non-spherical items (e.g. a pressure gauge) render as a flat photo, never a sphere. */
  flat?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const DEFAULT_SIZES = '(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px';

export function Ball3D({ src, alt, flat = false, className, sizes, priority }: Ball3DProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<BallInstance | null>(null);
  const [mode, setMode] = useState<'flat' | '3d'>('flat');

  useEffect(() => {
    if (flat) return;
    const engine = getEngine();
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!engine || !canvas || !root) return;

    let instance: BallInstance;
    try {
      instance = instanceRef.current ?? createInstance(canvas, getTexture(engine, src));
    } catch {
      return;
    }
    instanceRef.current = instance;

    registerInstance(engine, root, instance);
    setMode('3d');

    // Paint a real frame the moment the texture is ready (cache hit fires
    // immediately, cache miss fires once the image decodes), plus once right
    // now with whatever's available, plus once more next frame — avoids a
    // blank-sphere flash before the shared ~40fps loop's next tick.
    const paintNow = () => paintInstance(engine, instance);
    getTexture(engine, src, paintNow);
    paintNow();
    const rafId = requestAnimationFrame(paintNow);

    const handleEnter = () => onPointerEnter(instance);
    const handleLeave = () => onPointerLeave(instance);
    const handleMove = (event: PointerEvent) => {
      onPointerMove(instance, event.clientX, event.clientY, root.getBoundingClientRect());
    };

    root.addEventListener('pointerenter', handleEnter);
    root.addEventListener('pointerleave', handleLeave);
    root.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener('pointerenter', handleEnter);
      root.removeEventListener('pointerleave', handleLeave);
      root.removeEventListener('pointermove', handleMove);
      unregisterInstance(engine, root, instance);
    };
    // Only the flat/3d mode decides whether this effect should run at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flat]);

  useEffect(() => {
    if (flat) return;
    const engine = getEngine();
    const instance = instanceRef.current;
    if (!engine || !instance) return;
    instance.texture = getTexture(engine, src, () => paintInstance(engine, instance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, flat]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
      role="img"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? DEFAULT_SIZES}
        priority={priority}
        className="object-contain"
        style={{ opacity: mode === '3d' ? 0 : 1, transition: 'opacity .15s ease' }}
      />
      {!flat && (
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            opacity: mode === '3d' ? 1 : 0,
            transition: 'opacity .15s ease',
          }}
        />
      )}
    </div>
  );
}
