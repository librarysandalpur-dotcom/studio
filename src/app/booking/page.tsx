'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Armchair, Calendar as CalendarIcon, Clock, CheckCircle, User } from 'lucide-react';

const totalSeats = 30;
const generateBookedSeats = (date: Date | undefined) => {
    if (!date) return [];
    const seed = date.getDate() + date.getMonth() * 31 + date.getFullYear() * 365;
    const rng = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };
    const numBooked = Math.floor(rng(seed) * (totalSeats - 5)) + 5; // Book between 5 and totalSeats
    const booked = new Set<number>();
    while (booked.size < numBooked) {
        booked.add(Math.floor(rng(seed + booked.size) * totalSeats) + 1);
    }
    return Array.from(booked);
};

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const { toast } = useToast();

  const bookedSeats = generateBookedSeats(date);

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
  };

  const handleBooking = () => {
    if (!date || !selectedSeat) {
      toast({
        variant: 'destructive',
        title: 'Booking Failed',
        description: 'Please select a date and a seat.',
      });
      return;
    }

    toast({
      title: 'Booking Confirmed!',
      description: `Seat ${selectedSeat} booked for ${date.toLocaleDateString()}.`,
    });
    // In a real app, you would update the backend here.
    // For this demo, we'll just show the toast and clear selection.
    setSelectedSeat(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Book Your Seat</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a date and choose an available seat from our floor plan.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarIcon /> Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-0"
                    disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </CardContent>
            </Card>

            <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle /> Your Selection</CardTitle>
              <CardDescription>Confirm your booking details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><CalendarIcon className="w-4 h-4"/>Date</span>
                <span className="font-medium">{date ? date.toLocaleDateString() : 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Armchair className="w-4 h-4"/>Seat</span>
                <span className="font-medium">{selectedSeat ? `Seat ${selectedSeat}` : 'Not selected'}</span>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
                <Button className="w-full" onClick={handleBooking} disabled={!date || !selectedSeat}>
                    Confirm Booking
                </Button>
            </div>
            </Card>
        </div>
        
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Armchair /> Choose Your Seat</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"></div> Available</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-accent"></div> Selected</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500"></div> Booked</div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-4 justify-items-center">
                    {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seatNumber) => {
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = seatNumber === selectedSeat;
                        return (
                        <Button
                            key={seatNumber}
                            variant="outline"
                            size="icon"
                            className={cn(
                            'h-12 w-12 sm:h-14 sm:w-14 transition-all duration-200',
                            isBooked && 'bg-red-500 text-white cursor-not-allowed hover:bg-red-500',
                            isSelected && 'bg-accent text-accent-foreground hover:bg-accent/90',
                            !isBooked && !isSelected && 'bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800'
                            )}
                            onClick={() => handleSeatClick(seatNumber)}
                        >
                            <Armchair className="h-6 w-6"/>
                            <span className="sr-only">Seat {seatNumber}</span>
                        </Button>
                        );
                    })}
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
