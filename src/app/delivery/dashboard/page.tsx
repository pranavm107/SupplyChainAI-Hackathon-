import DeliveryDashboardClient from "@/components/delivery/delivery-dashboard-client";
import { Truck, CheckCircle, Package, Star } from "lucide-react";

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

export default function DeliveryDashboardPage() {
  return (
    <DeliveryDashboardClient data={deliveryData} />
  );
}
