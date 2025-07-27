import OrdersClient from '@/components/vendor/orders-client';

const activeOrders = [
    { id: 'ORD-102', item: 'Onions', quantity: '30kg', supplier: 'Fresh Veggies Co', status: 'In-Transit', eta: '2023-10-28', deliveryPerson: { name: 'Suresh K.', phone: '+919876543210' }, deliveryProofUrl: 'https://placehold.co/400x300.png' },
    { id: 'ORD-104', item: 'Paneer', quantity: '15kg', supplier: 'Amul Dairy', status: 'Processing', eta: '2023-10-29', deliveryPerson: null, deliveryProofUrl: null },
    { id: 'ORD-105', item: 'Tomatoes', quantity: '40kg', supplier: 'Gupta Supplies', status: 'Dispatched', eta: '2023-10-28', deliveryPerson: { name: 'Rina S.', phone: '+919876543211' }, deliveryProofUrl: null },
    { id: 'ORD-106', item: 'Potatoes', quantity: '50kg', supplier: 'Gupta Supplies', status: 'Delivered', eta: '2023-10-27', deliveryPerson: { name: 'Suresh K.', phone: '+919876543210' }, deliveryProofUrl: 'https://placehold.co/400x300.png' },
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
