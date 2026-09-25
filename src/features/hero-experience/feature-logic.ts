import { useState, useEffect, useRef } from 'react';
import type { UniverseId } from './feature-types';

export function useHeroParallax(activeUniverse: UniverseId, customHue?: number) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (animId !== null) return;
      animId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        setMousePos({ x, y });
        animId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  // Canvas particle backdrop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Color scheme based on active universe or custom theme hue
      let primaryHue = customHue ?? 275;
      if (activeUniverse === 'ragnarok') primaryHue = 42;
      if (activeUniverse === 'pokemon') primaryHue = 165;
      if (activeUniverse === 'mu') primaryHue = 345;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${primaryHue}, 85%, 65%, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${primaryHue}, 90%, 55%, 0.6)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeUniverse]);

  return {
    mousePos,
    canvasRef,
  };
}
