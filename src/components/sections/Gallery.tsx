import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export function Gallery() {
  const galleryImages = PlaceHolderImages.filter((img) => img.id.startsWith('gallery-'));

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            A Glimpse Inside Our Library
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our serene and well-equipped environment, designed for focused study and collaboration.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="aspect-w-3 aspect-h-2">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
