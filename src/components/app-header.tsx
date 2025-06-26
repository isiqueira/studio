import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';

interface AppHeaderProps {
  user: User;
}

export default function AppHeader({ user }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between h-20 px-8 border-b bg-card">
      <div className="flex items-center">
        <Image
          src="https://placehold.co/150x50.png"
          alt="Company Logo"
          width={150}
          height={50}
          data-ai-hint="logo"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-card-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={`@${user.name}`} data-ai-hint="person face" />
          <AvatarFallback>{user.avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
