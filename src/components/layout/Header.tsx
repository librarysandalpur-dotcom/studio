'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Booking' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookMarked className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-primary">
            Sanskriti Library
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
              prefetch={false}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-background/95 z-50">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center gap-6 mt-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
