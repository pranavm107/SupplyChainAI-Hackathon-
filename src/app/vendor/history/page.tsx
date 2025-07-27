import HistoryClient from '@/components/vendor/history-client';

const completedRequests = [
    { id: 'REQ-001', item: 'Potatoes', supplier: 'Gupta Supplies', quantity: '50kg', totalSpend: 2500, completionDate: '2023-10-20' },
    { id: 'REQ-003', item: 'Cooking Oil', supplier: 'Fresh Veggies Co', quantity: '20L', totalSpend: 2400, completionDate: '2023-10-18' },
    { id: 'REQ-008', item: 'Spices Mix', supplier: 'Masala House', quantity: '5kg', totalSpend: 1500, completionDate: '2023-10-15' },
    { id: 'REQ-010', item: 'Paneer', supplier: 'Amul Dairy', quantity: '10kg', totalSpend: 4000, completionDate: '2023-10-12' },
];

export default function VendorHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">History</h2>
      </div>
      <HistoryClient completedRequests={completedRequests} />
    </div>
  )
}
