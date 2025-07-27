import DeliveryDashboardClient from "@/components/delivery/delivery-dashboard-client";
import DeliveryDetailsCard from "@/components/shared/delivery-details-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const deliveryData = {
  summary: {
    pending: 5,
    completedToday: 12,
    totalEarningsToday: 1250.50,
    rating: 4.8,
  },
  activeDeliveries: [
    {
      id: "DEL-001",
      item: "Tomatoes (10kg)",
      pickup: "Gupta Supplies, Mumbai",
      dropoff: "Raju Chaat, Dadar",
      status: "Ongoing",
      eta: "15 mins",
    },
    {
      id: "DEL-002",
      item: "Paneer (5kg)",
      pickup: "Amul Dairy, Anand",
      dropoff: "Sita Snacks, Bandra",
      status: "Pending",
      eta: "45 mins",
    },
  ],
};

const dummyDeliveryDetails = {
    personName: "Self (Suresh Kumar)",
    deliveryId: "D-DEL-001",
    contactNumber: "+91 98765 43210",
    vehicleType: "Bike",
    status: "En Route" as const,
    arrivalLocation: "Raju Chaat, Dadar",
    arrivalTime: "2:30 PM IST",
};

export default function DeliveryDashboardPage() {
  return (
    <div className="space-y-6">
      <DeliveryDashboardClient data={deliveryData} />
      <Card>
        <CardHeader>
            <CardTitle>Route Overview Map</CardTitle>
            <CardDescription>Your delivery path from supplier to vendor.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[500px] w-full rounded-md border p-4 flex items-center justify-center">
                <Image src="https://placehold.co/800x500.png" alt="Route Overview Map" width={800} height={500} className="rounded-md object-cover" data-ai-hint="route map delivery" />
            </div>
        </CardContent>
      </Card>
      <DeliveryDetailsCard details={dummyDeliveryDetails} />
    </div>
  );
}
