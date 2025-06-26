import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-black text-white rounded-full p-1.5 flex items-center justify-center">
        {children}
    </div>
);

export default function QuoteDetailHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <Image
              src="https://proposalcpq.azurewebsites.net/img/stb-logo.png"
              alt="STB Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-foreground">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <Phone size={14} />
              </IconWrapper>
              <span>+61 (02) 9299 4428</span>
            </div>
            <div className="flex items-center gap-3">
              <IconWrapper>
                <Mail size={14} />
              </IconWrapper>
              <span>operations@stbaustralia.com.au</span>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-[#0B0F3A]" />
      </div>
    </header>
  );
}
