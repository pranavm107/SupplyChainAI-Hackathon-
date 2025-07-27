import AdminOrdersClient from "@/components/admin/admin-orders-client";
import { formatDate } from "@/lib/utils";

const allOrders = [
    { id: 'ORD-201', vendor: 'Raju Chaat', supplier: 'Gupta Supplies', item: 'Onions (30kg)', total: 900, status: 'In-Transit', deliveryDate: formatDate(new Date('2023-10-28')) },
    { id: 'ORD-202', vendor: 'Sita Snacks', supplier: 'Amul Dairy', item: 'Paneer (15kg)', total: 6000, status: 'Processing', deliveryDate: formatDate(new Date('2023-10-29')) },
    { id: 'ORD-203', vendor: 'Mumbai Vada Pav', supplier: 'Gupta Supplies', item: 'Tomatoes (40kg)', total: 1600, status: 'Shipped', deliveryDate: formatDate(new Date('2023-10-28')) },
    { id: 'ORD-204', vendor: 'Kolkata Rolls', supplier: 'Fresh Veggies Co', item: 'Potatoes (50kg)', total: 1250, status: 'Delivered', deliveryDate: formatDate(new Date('2023-10-27')) },
    { id: 'ORD-205', vendor: 'Raju Chaat', supplier: 'Masala House', item: 'Spice Mix (5kg)', total: 2500, status: 'Cancelled', deliveryDate: formatDate(new Date('2023-10-26')) },
];

export default function AdminOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Platform Orders</h2>
      </div>
      <AdminOrdersClient initialOrders={allOrders} />
    </div>
  )
}
