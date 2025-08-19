import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function AppFooter() {
  return (
    <footer className="bg-background text-foreground mt-auto border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 text-sm">
          {/* Logo */}
          <div className="flex items-start">
            <Image
              src="https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/stb-footer-icon-e1747230782897.webp"
              alt="STB Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          
          {/* Sydney Office */}
          <div className="font-code space-y-1">
            <h4 className="font-semibold text-base mb-2">Sydney Office</h4>
            <p>Level 6 - 225 Clarence Street</p>
            <p>Phone: +61 (02) 9299 4428</p>
          </div>

          {/* Gold Coast Office */}
          <div className="font-code space-y-1">
            <h4 className="font-semibold text-base mb-2">Gold Coast Office</h4>
            <p>Level 13 - 50 Cavill Ave</p>
            <p>Phone: +61 432 545 100</p>
          </div>
        </div>

        <div className="border-t pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-8">
                <Link href="https://facebook.com/stbaustralia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-code text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                    <span>facebook.com/stbaustralia</span>
                </Link>
                <Link href="https://instagram.com/stb_australia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-code text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                    <span>@stb_australia</span>
                </Link>
            </div>
            <p className="text-center text-xs text-muted-foreground font-code">
                © Copyright 2020 - STB Pacific Pty Ltd - Todos os direitos reservados - Politica de Privacidade
            </p>
        </div>
      </div>
    </footer>
  );
}