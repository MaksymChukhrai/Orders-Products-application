import type { Metadata } from 'next';
import { Providers } from './providers';
import TopMenu from '../components/TopMenu/TopMenu';
import NavigationMenu from '../components/NavigationMenu/NavigationMenu';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'Orders & Products',
  description: 'Orders and Products Management Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="app-container">
            <TopMenu />
            <div className="content-container">
              <NavigationMenu />
              <main className="main-content">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}