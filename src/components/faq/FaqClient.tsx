'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { answerQuestionAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const formSchema = z.object({
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }),
});

export function FaqClient() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnswer(null);
    try {
      const result = await answerQuestionAction({ question: values.question });
      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
      setAnswer('Sorry, I encountered an error trying to answer your question.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="e.g., How do I renew my membership?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ask
          </Button>
        </form>
      </Form>
      {(isLoading || answer) && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            {answer && <p className="text-sm">{answer}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
