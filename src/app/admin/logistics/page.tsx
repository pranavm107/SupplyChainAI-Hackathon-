import DeliveryDetailsCard from "@/components/shared/delivery-details-card";
import MapPlaceholder from "@/components/shared/map-placeholder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
          <CardTitle>Platform-Wide Logistics View</CardTitle>
          <CardDescription>Real-time tracking of all suppliers, vendors, and delivery personnel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-md border">
            <MapPlaceholder />
          </div>
        </CardContent>
      </Card>
      <DeliveryDetailsCard details={dummyDeliveryDetails} />
    </div>
  )
}
