import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserComponentProps {
  user: User;
}

export default function UserComponent({ user }: UserComponentProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user?.avatarUrl} alt={user?.name} />
        <AvatarFallback>{user?.avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="text-left hidden sm:block">
        <p className="text-sm font-semibold text-white">{user?.name}</p>
        <p className="text-xs text-white/70">{user?.email}</p>
        <p className="text-xs text-white/70">{user?.phone}</p>
      </div>
    </div>
  );
}
