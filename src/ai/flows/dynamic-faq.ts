'use server';
/**
 * @fileOverview A dynamic FAQ system using retrieval-augmented generation.
 *
 * - answerQuestion - A function that answers user questions about the library using RAG.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe('The user question about the library.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, incorporating information from the knowledge base.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
  return answerQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionInputSchema},
  output: {schema: AnswerQuestionOutputSchema},
  prompt: `You are a helpful librarian answering questions about Sanskriti Library.
Use the provided knowledge base to answer the following question. If the answer is not in the knowledge base, respond that you do not know.

Question: {{{question}}}

Knowledge Base: Sanskriti Library is a community library dedicated to providing resources and a quiet study environment for its members.  We offer comfortable seating, high-speed internet, and a wide collection of books and periodicals.  Membership plans are available on a monthly or annual basis.  The library is open from 9am to 9pm daily.  We also host regular workshops and events. To book a seat, use the online booking calendar at least 24 hours in advance.

Answer:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const answerQuestionFlow = ai.defineFlow(
  {
    name: 'answerQuestionFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
