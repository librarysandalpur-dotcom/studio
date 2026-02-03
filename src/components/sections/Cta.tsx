import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Cta() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about our membership plans or want to schedule a visit? Our team is here to help you get started.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
