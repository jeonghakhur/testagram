'use client';

import Link from 'next/link';
import { HomeOutline, PlusSquare, SearchLine } from '@/components/ui/icons';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import clsx from 'clsx';
import ColorButton from './ui/ColorButton';
import Avatar from './Avatar';

const menu = [
  { text: 'home', href: '/', icon: <HomeOutline /> },
  {
    text: 'search',
    href: '/search',
    icon: <SearchLine />,
  },
  { text: 'new', href: '/new', icon: <PlusSquare /> },
];
export default function NavBar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="hidden md:block">
        <h1 className="md:text-xl ">TESTAGRAM</h1>
      </Link>
      <nav className="w-full">
        <ul className="flex gap-4 p-4 items-center">
          {menu.map(({ text, href, icon }, index) => (
            <li
              key={href}
              className={clsx(
                [pathName === href && 'text-sky-700'],
                [index === 0 && 'mr-auto']
              )}
            >
              <Link href={href} title={text}>
                {icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.id}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
