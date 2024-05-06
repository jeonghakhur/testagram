'use client';
import Link from 'next/link';
import { HomeOutline, PlusSquare, SearchLine } from '@/components/ui/icons';
import { usePathname } from 'next/navigation';

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
    <div className="flex">
      <Link href="/">HOME</Link>
      <nav className="">
        <ul className="flex w-[300px]">
          {menu.map(({ text, href, icon }) => (
            <li key={href} className={pathName === href ? 'text-sky-700' : undefined}>
              <Link href={href}>{icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
