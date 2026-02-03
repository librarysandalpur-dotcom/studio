import { FaqClient } from '@/components/faq/FaqClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const commonQuestions = [
    {
        question: "What are the library's operating hours?",
        answer: "Sanskriti Library is open from 9am to 9pm daily, providing you with ample time to study and work."
    },
    {
        question: "How do I book a seat?",
        answer: "You can book a seat through our online booking calendar. We recommend booking at least 24 hours in advance to secure your spot."
    },
    {
        question: "What membership plans are available?",
        answer: "We offer flexible membership plans on a monthly or annual basis. For detailed pricing, please visit the membership section or contact us."
    },
    {
        question: "Is there a Wi-Fi connection available?",
        answer: "Yes, we provide high-speed internet access to all our members to ensure a smooth and productive session."
    }
]

export default function FaqPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question? Find answers here or ask our AI assistant for more specific information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Common Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {commonQuestions.map((item, index) => (
                             <AccordionItem value={`item-${index+1}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle />
                        Ask our AI Assistant
                    </CardTitle>
                    <CardDescription>
                        Can't find your question? Type it below for an instant answer.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FaqClient />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
