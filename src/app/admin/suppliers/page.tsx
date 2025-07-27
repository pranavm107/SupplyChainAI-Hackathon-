import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminSuppliersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Suppliers</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Suppliers</CardTitle>
          <CardDescription>This page is under construction. Check back later for supplier management features.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
