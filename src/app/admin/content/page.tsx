import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentForm } from "@/components/admin/ContentForm";

export default function ContentPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Content Management</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Website Content</CardTitle>
                    <CardDescription>Update the text and images displayed on your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContentForm />
                </CardContent>
            </Card>
        </div>
    )
}
