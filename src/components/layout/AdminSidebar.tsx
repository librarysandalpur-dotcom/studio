'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Image,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/memberships', label: 'Memberships', icon: Users },
  { href: '/admin/content', label: 'Content', icon: Image },
];

function NavContent() {
    const pathname = usePathname();
    return (
        <>
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Admin Panel</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                    key={href}
                    href={href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === href && 'bg-muted text-primary'
                    )}
                    >
                    <Icon className="h-4 w-4" />
                    {label}
                    </Link>
                ))}
                </nav>
            </div>
        </>
    );
}


export function AdminSidebar() {
  return (
    <>
      <div className="hidden border-r bg-card md:block w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <NavContent />
        </div>
      </div>
      <header className="flex h-14 items-center gap-4 border-b bg-card px-6 md:hidden sticky top-0 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 flex flex-col">
            <NavContent />
          </SheetContent>
        </Sheet>
         <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Admin</span>
        </Link>
      </header>
    </>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
