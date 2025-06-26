import Link from 'next/link';
import UserComponent from './user-component';
import { currentUser } from '@/data/user';

const StbLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="80"
    height="32"
    viewBox="0 0 80 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.14 13.1C21.14 10.94 20.46 9.1 19.1 7.58C17.74 6.06 15.9 5.3 13.58 5.3H5V26.5H13.7C16.02 26.5 17.86 25.72 19.22 24.16C20.58 22.6 21.26 20.76 21.26 18.64V17.06H15.06V18.5C15.06 19.64 14.71 20.53 14.01 21.17C13.31 21.81 12.35 22.13 11.13 22.13H9.36V19.33H15.22V12.41H9.36V9.67H11.01C12.29 9.67 13.23 9.99 13.83 10.63C14.43 11.27 14.73 12.15 14.73 13.27V14.85H21.14V13.1Z"
      fill="white"
    />
    <path
      d="M38.89 21.03V26.5H34.53V5.3H41.51C43.43 5.3 44.92 5.86 45.98 6.98C47.04 8.1 47.57 9.53 47.57 11.27C47.57 12.63 47.16 13.81 46.34 14.81C45.52 15.81 44.4 16.52 43.08 16.94L48.17 26.5H43.19L38.89 17.77V21.03ZM38.89 9.67V15.53H41.39C42.53 15.53 43.38 15.17 43.94 14.45C44.5 13.73 44.78 12.7 44.78 11.36C44.78 10.02 44.49 9.02 43.91 8.36C43.33 7.7 42.44 7.37 41.24 7.37H38.89V9.67Z"
      fill="white"
    />
    <path
      d="M62.33 13.37V5.3H57.97V26.5H62.33V18.15C62.33 16.19 62.9 14.63 64.04 13.47C65.18 12.31 66.62 11.73 68.36 11.73H69.64V15.75H68.24C67.34 15.75 66.63 15.96 66.11 16.38C65.59 16.8 65.33 17.42 65.33 18.24V26.5H69.69V18.15C69.69 16.19 70.26 14.63 71.4 13.47C72.54 12.31 73.98 11.73 75.72 11.73H77V15.75H75.6C74.7 15.75 73.99 15.96 73.47 16.38C72.95 16.8 72.69 17.42 72.69 18.24V26.5H77.05V5.3H65.33V9.11H62.33V13.37Z"
      fill="white"
    />
  </svg>
);


const navLinks = [
  { href: '#', label: 'ESTUDE INGLÊS' },
  { href: '#', label: 'PROFISSÕES' },
  { href: '#', label: 'VOCACIONAL' },
  { href: '#', label: 'SUPERIOR' },
  { href: '#', label: 'HIGH SCHOOL' },
  { href: '#', label: 'BLOG' },
  { href: '#', label: 'SOBRE' },
];

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-[#0B0F3A]">
      <div className="flex items-center gap-10">
        <Link href="/">
          <StbLogo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm font-semibold text-white/80 hover:text-white uppercase tracking-wider">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <UserComponent user={currentUser} />
      </div>
    </header>
  );
}
