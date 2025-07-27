import SupplierHistoryClient from "@/components/supplier/supplier-history-client";
import { formatDate } from "@/lib/utils";

const completedOrders = [
    { id: 'ORD-101', vendor: 'Raju Chaat', item: 'Potatoes', total: 2500, status: 'Completed', date: formatDate(new Date('2023-10-20')) },
    { id: 'ORD-103', vendor: 'Sita Snacks', item: 'Cooking Oil', total: 2400, status: 'Completed', date: formatDate(new Date('2023-10-18')) },
    { id: 'ORD-108', vendor: 'Mumbai Vada Pav', item: 'Spices Mix', total: 1500, status: 'Completed', date: formatDate(new Date('2023-10-15')) },
    { id: 'ORD-110', vendor: 'Kolkata Rolls', item: 'Paneer', total: 4000, status: 'Cancelled', date: formatDate(new Date('2023-10-12')) },
];

export default function SupplierHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">History</h2>
      </div>
      <SupplierHistoryClient completedOrders={completedOrders} />
    </div>
  )
}
