import { useState, useEffect, useRef } from 'react';

export function useAnimatedNumber(target: number, duration: number = 800, decimals: number = 0): number {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(0);

  useEffect(() => {
    startTime.current = null;
    startValue.current = current;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startValue.current + (target - startValue.current) * eased;
      
      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return Number(current.toFixed(decimals));
}
