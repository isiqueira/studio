import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AppHeader() {
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
          <p className="font-semibold text-card-foreground">John Doe</p>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
        <Avatar>
          <AvatarImage src="https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/fake_porfile_img.jpg" alt="@johndoe" data-ai-hint="person face" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
