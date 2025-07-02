
import Link from 'next/link';
import Image from 'next/image';
import UserComponent from './user-component';
import { currentUser } from '@/data/user';

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-8 bg-[#0B0F3A] border-b border-gray-700">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image
            src="https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/stb-header-icon-e1747230805925.webp"
            alt="STB Logo"
            width={80}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <UserComponent user={currentUser} />
      </div>
    </header>
  );
}
