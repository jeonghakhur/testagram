'use client';

import Link from 'next/link';
import { HomeOutline, PlusSquare, SearchLine } from '@/components/ui/icons';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';

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
  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl ">TESTAGRAM</h1>
      </Link>
      <nav className="">
        <ul className="flex gap-4 p-4 items-center">
          {menu.map(({ text, href, icon }) => (
            <li key={href} className={pathName === href ? 'text-sky-700' : undefined}>
              <Link href={href} title={text}>
                {icon}
              </Link>
            </li>
          ))}
          <li>
            <ColorButton text="Sign in" onClick={() => {}} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
