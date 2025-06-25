import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="https://placehold.co/150x50.png"
              alt="Company Logo"
              width={150}
              height={50}
              data-ai-hint="logo"
            />
            <p className="text-muted-foreground text-sm">
              A curated collection of inspiring quotes to brighten your day.
            </p>
          </div>
          
          {/* Quick Links */}
          {/* <div>
            <h3 className="text-sm font-semibold text-card-foreground tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Submit a Quote</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div> */}
          
          {/* Legal */}
          {/* <div>
            <h3 className="text-sm font-semibold text-card-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div> */}

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground tracking-wider uppercase">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Eloquent Echoes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
