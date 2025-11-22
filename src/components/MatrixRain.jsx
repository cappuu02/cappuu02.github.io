import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.25, speed = 60 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fullscreen canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Matrix characters
    const chars = ["0", "1"];
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    // Each drop represents a column
    const drops = new Array(columns).fill(1);

    const draw = () => {
      // background fade effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.08)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,255,0,0.65)";
      ctx.font = `${fontSize}px JetBrains Mono`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);

        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, zIndex: 0 }}
    />
  );
}
