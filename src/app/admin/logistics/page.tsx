import DeliveryDetailsCard from "@/components/shared/delivery-details-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const dummyDeliveryDetails = {
    personName: "Suresh Kumar",
    deliveryId: "ADM-DEL-001",
    contactNumber: "+91 98765 43210",
    vehicleType: "Van",
    status: "En Route" as const,
    arrivalLocation: "Mumbai, 400001",
    arrivalTime: "3:45 PM IST",
};

export default function AdminLogisticsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Logistics & Dispatch Map</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Global Vendor-Supplier Activity Map</CardTitle>
          <CardDescription>Real-time heatmap of vendor and supplier activity across India.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-md border p-4 flex items-center justify-center">
            <Image src="https://placehold.co/800x500.png" alt="Global Activity Heatmap" width={800} height={500} className="rounded-md object-cover" data-ai-hint="activity heatmap India" />
          </div>
        </CardContent>
      </Card>
      <DeliveryDetailsCard details={dummyDeliveryDetails} />
    </div>
  )
}
