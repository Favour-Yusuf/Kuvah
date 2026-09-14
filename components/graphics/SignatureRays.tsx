const RAY_COUNT = 8;
const INNER_RADIUS = 40;
const OUTER_RADIUS = 92;
const CENTER = 100;

export function SignatureRays({ className }: { className?: string }) {
  const rays = Array.from({ length: RAY_COUNT }, (_, index) => {
    const angle = (index / RAY_COUNT) * Math.PI * 2;
    return {
      x1: CENTER + Math.cos(angle) * INNER_RADIUS,
      y1: CENTER + Math.sin(angle) * INNER_RADIUS,
      x2: CENTER + Math.cos(angle) * OUTER_RADIUS,
      y2: CENTER + Math.sin(angle) * OUTER_RADIUS,
    };
  });

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      {rays.map((ray, index) => (
        <line
          key={index}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}
