export const metadata = {
  title: 'Pozozo Sports Studio',
  robots: { index: false, follow: false },
};

export { viewport } from 'next-sanity/studio';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
