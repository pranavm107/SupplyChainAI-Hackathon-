import AdminDeliveriesClient from "@/components/admin/admin-deliveries-client";
import { formatDate } from "@/lib/utils";

const allDeliveries = [
    { id: 'DEL-001', orderId: 'ORD-201', vendor: 'Raju Chaat', supplier: 'Gupta Supplies', deliveryPerson: 'Suresh Kumar', status: 'In-Transit', lastUpdate: formatDate(new Date('2023-10-28T10:30:00Z')) },
    { id: 'DEL-002', orderId: 'ORD-202', vendor: 'Sita Snacks', supplier: 'Amul Dairy', deliveryPerson: 'Rina S.', status: 'Pending Pickup', lastUpdate: formatDate(new Date('2023-10-28T11:00:00Z')) },
    { id: 'DEL-003', orderId: 'ORD-203', vendor: 'Mumbai Vada Pav', supplier: 'Gupta Supplies', deliveryPerson: 'Suresh Kumar', status: 'Shipped', lastUpdate: formatDate(new Date('2023-10-28T09:00:00Z')) },
    { id: 'DEL-004', orderId: 'ORD-204', vendor: 'Kolkata Rolls', supplier: 'Fresh Veggies Co', deliveryPerson: 'Amit P.', status: 'Delivered', lastUpdate: formatDate(new Date('2023-10-27T14:00:00Z')) },
    { id: 'DEL-005', orderId: 'ORD-205', vendor: 'Raju Chaat', supplier: 'Masala House', deliveryPerson: 'Rina S.', status: 'Cancelled', lastUpdate: formatDate(new Date('2023-10-26T12:00:00Z')) },
];

export default function AdminDeliveriesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Platform Deliveries</h2>
      </div>
      <AdminDeliveriesClient initialDeliveries={allDeliveries} />
    </div>
  )
}
