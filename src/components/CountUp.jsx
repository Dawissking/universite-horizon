import React, { useEffect, useRef, useState } from 'react';

export default function CountUp({ target, duration = 1200, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericTarget) || numericTarget === 0) {
      setDisplay(String(target));
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const start = performance.now();
        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * numericTarget));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  const suffixPart = String(target).replace(/[0-9]/g, '');

  return (
    <span ref={ref} className="count-up-value">
      {prefix}{display}{suffixPart || suffix}
    </span>
  );
}
