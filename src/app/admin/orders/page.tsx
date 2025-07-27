import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Orders</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>This page is under construction. Check back later for platform-wide order monitoring.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
