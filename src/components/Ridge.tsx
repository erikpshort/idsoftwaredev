'use client';

import { useEffect, useRef } from 'react';

// Logo teal, deepened, then lifted toward the pale water in the mark.
const STOPS: [number, number, number][] = [
  [26, 90, 104],
  [72, 144, 160],
  [158, 214, 224],
];

function colorAt(t: number): [number, number, number] {
  const clamped = Math.min(1, Math.max(0, t));
  const seg = clamped < 0.5 ? 0 : 1;
  const local = (clamped - seg * 0.5) * 2;
  const [a, b] = [STOPS[seg], STOPS[seg + 1]];
  return [
    a[0] + (b[0] - a[0]) * local,
    a[1] + (b[1] - a[1]) * local,
    a[2] + (b[2] - a[2]) * local,
  ];
}

/**
 * A quiet ridgeline of dots behind the hero, in the mountain mark's teal.
 * One static frame when the visitor prefers reduced motion.
 */
export default function Ridge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const w = Math.max(1, Math.round(width * dpr));
      const h = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (w !== canvas.width || h !== canvas.height) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (ms: number) => {
      if (width < 2 || height < 2) return;
      const t = reduceMotion ? 0 : ms * 0.00028;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.max(32, Math.floor(width / 24));
      const rows = 11;
      const sheetTop = height * 0.46;
      const sheetHeight = height * 0.42;

      for (let j = 0; j < rows; j++) {
        const v = j / (rows - 1);
        for (let i = 0; i <= cols; i++) {
          const u = i / cols;
          const x = u * width;
          const ridge = Math.sin(u * Math.PI) * 0.85;
          const wave =
            Math.sin(u * 4.2 + t + v * 1.2) * 0.42 +
            Math.sin(u * 9.4 - t * 1.25) * 0.18 +
            ridge * 0.55;

          const y = sheetTop + v * sheetHeight + wave * height * 0.06 - ridge * height * 0.08;
          const crest = (wave + 1.4) / 2.8;
          const radius = 0.7 + crest * 1.8 * (1 - v * 0.4);
          const [cr, cg, cb] = colorAt(u * 0.85 + v * 0.15);
          const edgeFade = Math.min(1, u * 5) * Math.min(1, (1 - u) * 5);
          const alpha = (0.2 + crest * 0.62) * (1 - v * 0.45) * edgeFade;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const start = () => {
      if (reduceMotion) {
        draw(0);
        return;
      }
      if (running) return;
      running = true;
      const loop = (ms: number) => {
        if (!running) return;
        draw(ms);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      resize();
      if (width < 2 || height < 2) return;
      draw(reduceMotion ? 0 : performance.now());
      if (visible) start();
    };

    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(host);
    window.addEventListener('resize', sync);

    const rafRetry = requestAnimationFrame(sync);
    const retry = window.setTimeout(sync, 120);

    const io = reduceMotion
      ? null
      : new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (visible) start();
          else if (entry.boundingClientRect.height > 1) stop();
        });
    io?.observe(host);

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener('resize', sync);
      cancelAnimationFrame(rafRetry);
      window.clearTimeout(retry);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
