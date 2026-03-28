import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cinnamoroll House Builder',
  description: 'A cute kid-friendly mini game built with Next.js'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
