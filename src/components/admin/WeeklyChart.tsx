'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { name: 'Mon', bookings: 22 },
  { name: 'Tue', bookings: 25 },
  { name: 'Wed', bookings: 18 },
  { name: 'Thu', bookings: 28 },
  { name: 'Fri', bookings: 30 },
  { name: 'Sat', bookings: 35 },
  { name: 'Sun', bookings: 32 },
];

export function WeeklyChart() {
    return (
        <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                    />
                    <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}
