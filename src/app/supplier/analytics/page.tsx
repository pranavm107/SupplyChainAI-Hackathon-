import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupplierAnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Analytics</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Analytics</CardTitle>
          <CardDescription>This page is under construction. Check back later for analytics features.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
