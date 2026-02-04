import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookCheck, BarChart, CalendarCheck } from "lucide-react";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const WeeklyChart = dynamic(
  () => import('@/components/admin/WeeklyChart').then(mod => mod.WeeklyChart),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[350px] w-full" />
  }
);


export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Seats Booked Today</CardTitle>
                        <BookCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                         <p className="text-xs text-muted-foreground">out of 30 available</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">982</div>
                        <p className="text-xs text-muted-foreground">80% of total members</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">150</div>
                        <p className="text-xs text-muted-foreground">for this week</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart /> Weekly Booking Analytics</CardTitle>
                    <CardDescription>A look at seat bookings over the last week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <WeeklyChart />
                </CardContent>
            </Card>
        </div>
    )
}
