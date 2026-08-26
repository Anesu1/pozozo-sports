interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 28 }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', flexShrink: 0, width: size, height: size, objectFit: 'contain' }}
    />
  );
}
