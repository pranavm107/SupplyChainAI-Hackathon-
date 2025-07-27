import SupplierOrdersClient from '@/components/supplier/supplier-orders-client';
import { formatDate } from '@/lib/utils';
import DeliveryDetailsCard from '@/components/shared/delivery-details-card';
import MapPlaceholder from '@/components/shared/map-placeholder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const activeOrders = [
    { id: 'ORD-201', vendor: 'Raju Chaat', item: 'Onions', quantity: '30kg', total: 900, status: 'In-Transit', deliveryDate: formatDate(new Date('2023-10-28')), pickupStatus: 'Picked Up' },
    { id: 'ORD-202', vendor: 'Sita Snacks', item: 'Paneer', quantity: '15kg', total: 6000, status: 'Processing', deliveryDate: formatDate(new Date('2023-10-29')), pickupStatus: 'Awaiting Pickup' },
    { id: 'ORD-203', vendor: 'Mumbai Vada Pav', item: 'Tomatoes', quantity: '40kg', total: 1600, status: 'Shipped', deliveryDate: formatDate(new Date('2023-10-28')), pickupStatus: 'Picked Up' },
];

const dummyDeliveryDetails = {
    personName: "Rina S.",
    deliveryId: "SUP-DEL-001",
    contactNumber: "+91 98765 43211",
    vehicleType: "Bike",
    status: "En Route" as const,
    arrivalLocation: "Raju Chaat, Mumbai",
    arrivalTime: "4:00 PM IST",
};


export default function SupplierOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Orders</h2>
      </div>
      <SupplierOrdersClient activeOrders={activeOrders} />
       <Card>
        <CardHeader>
          <CardTitle>Live Dispatch Map</CardTitle>
          <CardDescription>Real-time tracking of all outgoing deliveries.</CardDescription>
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
