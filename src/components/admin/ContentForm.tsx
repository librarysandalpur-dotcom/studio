'use client';

import { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { optimizeImageAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  heroTitle: z.string().min(10),
  heroSubtitle: z.string().min(20),
});

export function ContentForm() {
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroTitle: 'Find Your Focus at Sanskriti Library',
      heroSubtitle: 'A premium, quiet, and resourceful space designed for students and professionals to achieve their goals.',
    },
  });

  function onTextSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Content Updated!',
      description: 'The website text has been successfully saved.',
    });
  }

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit for GenAI
        toast({
            variant: 'destructive',
            title: 'Image too large',
            description: 'Please upload an image smaller than 4MB.',
        });
        return;
    }

    setIsOptimizing(true);
    setOriginalImage(null);
    setOptimizedImage(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageDataUri = reader.result as string;
      setOriginalImage(imageDataUri);

      try {
        const result = await optimizeImageAction({
          imageDataUri,
          maxWidth: 800,
          maxHeight: 600,
        });
        setOptimizedImage(result.optimizedImageDataUri);
        toast({
          title: 'Image Optimized!',
          description: 'The image has been successfully optimized for the web.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Optimization Failed',
          description: 'There was an error optimizing the image.',
        });
      } finally {
        setIsOptimizing(false);
      }
    };
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onTextSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="heroTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Section Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroSubtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Section Subtitle</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Text Content</Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Gallery Image Optimization</h3>
        <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            Upload an image to optimize it for the gallery.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              {isOptimizing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Select Image'
              )}
            </label>
          </Button>
          <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isOptimizing} />
        </div>

        {isOptimizing && (
            <div className="text-center p-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Optimizing image...</p>
            </div>
        )}

        {(originalImage || optimizedImage) && !isOptimizing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Original</h4>
              {originalImage && <Image src={originalImage} alt="Original" width={400} height={300} className="rounded-md object-contain border bg-white p-2" />}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Optimized</h4>
              {optimizedImage && <Image src={optimizedImage} alt="Optimized" width={400} height={300} className="rounded-md object-contain border bg-white p-2" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
