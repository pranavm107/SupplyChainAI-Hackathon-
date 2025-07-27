import OrdersClient from '@/components/vendor/orders-client';

const activeOrders = [
    { id: 'ORD-102', item: 'Onions', quantity: '30kg', supplier: 'Fresh Veggies Co', status: 'In-Transit', eta: '2023-10-28' },
    { id: 'ORD-104', item: 'Paneer', quantity: '15kg', supplier: 'Amul Dairy', status: 'Processing', eta: '2023-10-29' },
    { id: 'ORD-105', item: 'Tomatoes', quantity: '40kg', supplier: 'Gupta Supplies', status: 'Dispatched', eta: '2023-10-28' },
];

export default function VendorOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Orders</h2>
      </div>
      <OrdersClient activeOrders={activeOrders} />
    </div>
  )
}
