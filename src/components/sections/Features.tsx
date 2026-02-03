import { Wifi, BookOpen, Users, Coffee, Zap, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'Air Conditioned',
    description: 'Study in comfort with our fully air-conditioned premises.',
  },
  {
    icon: <Wifi className="h-8 w-8 text-primary" />,
    title: 'High-Speed Wi-Fi',
    description: 'Seamless internet connectivity to keep your work uninterrupted.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Extensive Collection',
    description: 'Access a wide range of books and periodicals for your research.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Power Backup',
    description: 'Uninterrupted power supply to ensure you never lose your progress.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Events',
    description: 'Engage in workshops and events to network and learn.',
  },
  {
    icon: <Coffee className="h-8 w-8 text-primary" />,
    title: 'Refreshment Zone',
    description: 'Take a break and recharge with coffee and snacks.',
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            An Environment Built for Success
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide top-notch facilities to ensure you have a productive and comfortable study experience.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
