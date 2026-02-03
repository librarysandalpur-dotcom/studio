'use server';

/**
 * @fileOverview Optimizes uploaded images for web use.
 *
 * - optimizeUploadedImages - A function that optimizes an uploaded image.
 * - OptimizeUploadedImagesInput - The input type for the optimizeUploadedImages function.
 * - OptimizeUploadedImagesOutput - The return type for the optimizeUploadedImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeUploadedImagesInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to optimize, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  maxWidth: z.number().optional().describe('The maximum width of the image.'),
  maxHeight: z.number().optional().describe('The maximum height of the image.'),
});
export type OptimizeUploadedImagesInput = z.infer<typeof OptimizeUploadedImagesInputSchema>;

const OptimizeUploadedImagesOutputSchema = z.object({
  optimizedImageDataUri: z
    .string()
    .describe('The optimized image, as a data URI.'),
});
export type OptimizeUploadedImagesOutput = z.infer<typeof OptimizeUploadedImagesOutputSchema>;

export async function optimizeUploadedImages(input: OptimizeUploadedImagesInput): Promise<OptimizeUploadedImagesOutput> {
  return optimizeUploadedImagesFlow(input);
}

const optimizeUploadedImagesFlow = ai.defineFlow(
  {
    name: 'optimizeUploadedImagesFlow',
    inputSchema: OptimizeUploadedImagesInputSchema,
    outputSchema: OptimizeUploadedImagesOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {media: {url: input.imageDataUri}},
        {
          text: `Optimize this image for web use. ${input.maxWidth ? `Maximum width: ${input.maxWidth}.` : ''} ${input.maxHeight ? `Maximum height: ${input.maxHeight}.` : ''}`,
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('No image was returned.');
    }

    return {optimizedImageDataUri: media.url!};
  }
);
