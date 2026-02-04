import Link from 'next/link';
import { BookOpen, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Sanskriti Library</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your dedicated space for learning and growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="font-semibold">Quick Links</h3>
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Booking
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Events
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sanskriti Library. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
