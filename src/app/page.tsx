import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Gallery } from '@/components/sections/Gallery';
import { Cta } from '@/components/sections/Cta';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Gallery />
      <Cta />
    </div>
  );
}
