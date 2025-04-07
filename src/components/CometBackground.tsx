import React, { useEffect, useRef } from 'react';

interface Comet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const CometBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const comets = useRef<Comet[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize comets
    const createComet = (): Comet => ({
      x: Math.random() * canvas.width - canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 1 + Math.random() * 2,
      speed: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.4
    });

    for (let i = 0; i < 50; i++) {
      comets.current.push(createComet());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      comets.current.forEach((comet, index) => {
        // Move comet
        comet.x += comet.speed;
        comet.y += comet.speed;

        // Draw comet
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - 50,
          comet.y - 50
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${comet.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = comet.size;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - 50, comet.y - 50);
        ctx.stroke();

        // Reset comet if it goes off screen
        if (comet.x > canvas.width + 100 && comet.y > canvas.height + 100) {
          comets.current[index] = createComet();
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default CometBackground;