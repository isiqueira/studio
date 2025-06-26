import Image from 'next/image';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F3A] text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <Image
            src="https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/stb-header-icon-e1747230805925.webp"
            alt="STB Logo"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
          <p className="text-sm text-white/80">&copy; {currentYear} STB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
