import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
          Find Your Focus at Sanskriti Library
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-8 drop-shadow-md">
          A premium, quiet, and resourceful space designed for students and professionals to achieve their goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/booking">
                    Book a Seat
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">
                    Enquire Now
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
