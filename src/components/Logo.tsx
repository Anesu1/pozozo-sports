interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 28 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M50,4 A46,46 0 1,0 50,96 A46,46 0 1,0 50,4 M24,28 H76 L36,60 H76 V72 H24 L64,40 H24 Z"
      />
    </svg>
  );
}
