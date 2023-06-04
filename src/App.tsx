import { useEffect, useRef, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const App = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ctx = canvasRef.current?.getContext('2d');

  useEffect(() => {
    const handleResize = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener('resize', handleResize);

    setInterval(draw, 36);

    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions]);

  let chars: string | string[] =
    'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';

  chars = chars.split('');

  const fontSize = 10;
  const columns = dimensions.width / fontSize;

  const drops: number[] = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    if (ctx) {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > dimensions.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      id="myCanvas"
      className="bg-black"
      width={dimensions.width}
      height={dimensions.height}></canvas>
  );
};

export default App;
