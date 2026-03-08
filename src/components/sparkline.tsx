interface SparklineProps {
  points: number[];
}

export function Sparkline({ points }: SparklineProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="h-12 w-full" fill="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgb(13 148 136)" />
          <stop offset="100%" stopColor="rgb(3 105 161)" />
        </linearGradient>
      </defs>
      <path d={path} stroke="url(#spark-fill)" strokeLinecap="round" strokeWidth="6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

