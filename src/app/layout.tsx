
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'STB Australia - Quotation',
  description: 'STB Australia - Quotation',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'msapplication-TileColor': '#da532c',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      {/* The <head> tag is now managed by Next.js via the metadata export above. */}
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
