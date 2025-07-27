import AdminHistoryClient from "@/components/admin/admin-history-client";
import { formatDate } from "@/lib/utils";

const historyLogs = [
    { id: 'LOG-001', user: 'Rajesh Kumar (Vendor)', action: 'Created Request REQ-123', target: 'Tomatoes', timestamp: formatDate(new Date('2023-10-26T10:00:00Z')) },
    { id: 'LOG-002', user: 'Admin', action: 'Approved Request REQ-123', target: 'Tomatoes', timestamp: formatDate(new Date('2023-10-26T10:05:00Z')) },
    { id: 'LOG-003', user: 'Gupta Supplies', action: 'Accepted Order ORD-201', target: 'Tomatoes', timestamp: formatDate(new Date('2023-10-26T11:20:00Z')) },
    { id: 'LOG-004', user: 'Admin', action: 'Disabled Supplier "Bad Supplies"', target: 'Supplier Account', timestamp: formatDate(new Date('2023-10-25T15:00:00Z')) },
    { id: 'LOG-005', user: 'Sita Snacks (Vendor)', action: 'Reported issue with ORD-199', target: 'Order', timestamp: formatDate(new Date('2023-10-25T14:30:00Z')) },
    { id: 'LOG-006', user: 'Gupta Supplies', action: 'Updated status of ORD-201 to Shipped', target: 'Order', timestamp: formatDate(new Date('2023-10-27T09:00:00Z')) },
];

export default function AdminHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Platform History</h2>
      </div>
      <AdminHistoryClient historyLogs={historyLogs} />
    </div>
  )
}
