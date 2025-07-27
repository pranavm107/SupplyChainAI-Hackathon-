import SupplierOrdersClient from '@/components/supplier/supplier-orders-client';
import { formatDate } from '@/lib/utils';

const activeOrders = [
    { id: 'ORD-201', vendor: 'Raju Chaat', item: 'Onions', quantity: '30kg', total: 900, status: 'In-Transit', deliveryDate: formatDate(new Date('2023-10-28')), pickupStatus: 'Picked Up' },
    { id: 'ORD-202', vendor: 'Sita Snacks', item: 'Paneer', quantity: '15kg', total: 6000, status: 'Processing', deliveryDate: formatDate(new Date('2023-10-29')), pickupStatus: 'Awaiting Pickup' },
    { id: 'ORD-203', vendor: 'Mumbai Vada Pav', item: 'Tomatoes', quantity: '40kg', total: 1600, status: 'Shipped', deliveryDate: formatDate(new Date('2023-10-28')), pickupStatus: 'Picked Up' },
];


export default function SupplierOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Orders</h2>
      </div>
      <SupplierOrdersClient activeOrders={activeOrders} />
    </div>
  )
}
