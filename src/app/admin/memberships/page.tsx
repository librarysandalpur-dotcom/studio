import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MembersTable } from "@/components/admin/MembersTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const membershipPlans = [
    { name: "Monthly", price: "500", id: "monthly" },
    { name: "Quarterly", price: "1350", id: "quarterly" },
    { name: "Annually", price: "5000", id: "annually" },
];

export default function MembershipsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Membership Management</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Member
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Members</CardTitle>
                    <CardDescription>A list of all members in the library.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MembersTable />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Membership Plans</CardTitle>
                    <CardDescription>Manage pricing and details for membership plans.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {membershipPlans.map(plan => (
                             <div key={plan.id} className="space-y-2">
                                <Label htmlFor={plan.id}>{plan.name} Plan Price (INR)</Label>
                                <Input id={plan.id} type="number" defaultValue={plan.price} />
                            </div>
                        ))}
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
