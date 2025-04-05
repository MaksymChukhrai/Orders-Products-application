import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopMenu from '@/components/TopMenu/TopMenu';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orders & Products App',
  description: 'Full stack application for managing orders and products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopMenu />
        <NavigationMenu />
        {children}
      </body>
    </html>
  );
}