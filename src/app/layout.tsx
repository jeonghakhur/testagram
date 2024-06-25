import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/Navbar';
import { clsx } from 'clsx';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Testagram',
    template: 'Testagram | %s',
  },
  description:
    '테니스클럽의 경기 결과 및 일정, 그리고 커뮤니티 공간 Testagram.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(clsx(inter.className), 'w-full bg-neutral-50')}>
        <AuthContext>
          <div className="max-w-screen-xl mx-auto">
            <header className="sticky top-0 bg-white z-20 border-b">
              <NavBar />
            </header>
            <main className="p-6">
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </div>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
