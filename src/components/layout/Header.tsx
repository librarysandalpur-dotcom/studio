'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Library, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Booking' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  // Close menu on navigation
  useEffect(() => {
    if(isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Library className="h-6 w-6 text-primary" />
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
          {!loading &&
            (user ? (
              <>
                <Link
                  href="/admin"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname.startsWith('/admin')
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  prefetch={false}
                >
                  Admin
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link
                href="/login"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === '/login'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
                prefetch={false}
              >
                Staff Login
              </Link>
            ))}
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 z-40">
          <nav className="flex flex-col items-center gap-6 py-8">
            {[...navLinks, ...(user ? [{href: '/admin', label: 'Admin'}] : [{href: '/login', label: 'Staff Login'}])].map(({ href, label }) => (
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
             {user && (
                <Button variant="ghost" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>Logout</Button>
              )}
          </nav>
        </div>
      )}
    </header>
  );
}
