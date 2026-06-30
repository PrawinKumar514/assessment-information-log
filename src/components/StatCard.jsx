import { useEffect, useState, useRef } from 'react';

export default function StatCard({ icon, value, label, color = 'blue', delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseInt(value, 10) || 0;
    if (target === 0) { setDisplayValue(0); return; }

    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplayValue(start);
      if (progress < 1) requestAnimationFrame(animate);
    }

    const timer = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const Icon = icon;

  return (
    <div className={`stat-card ${color} animate-in animate-in-delay-${delay / 50}`} ref={ref}>
      <div className={`stat-icon ${color}`}>
        <Icon />
      </div>
      <div className="stat-info">
        <h3>{displayValue}{typeof value === 'string' && value.includes('%') ? '%' : ''}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}
