import AdminRequestsClient from "@/components/admin/admin-requests-client";
import { formatDate } from "@/lib/utils";

const allRequests = [
    { id: 'REQ-005', vendor: 'Raju Chaat', item: 'Tomatoes', quantity: '20kg', location: 'Mumbai', status: 'New', requiredBy: formatDate(new Date('2023-10-27')) },
    { id: 'REQ-006', vendor: 'Sita Snacks', item: 'Besan Flour', quantity: '50kg', location: 'Delhi', status: 'New', requiredBy: formatDate(new Date('2023-10-27')) },
    { id: 'REQ-007', vendor: 'Mumbai Vada Pav', item: 'Potatoes', quantity: '100kg', location: 'Mumbai', status: 'In Process', requiredBy: formatDate(new Date('2023-10-26')) },
    { id: 'REQ-008', vendor: 'Kolkata Rolls', item: 'Mustard Oil', quantity: '15L', location: 'Kolkata', status: 'Approved', requiredBy: formatDate(new Date('2023-10-25')) },
    { id: 'REQ-009', vendor: 'Delhi Sweets', item: 'Sugar', quantity: '200kg', location: 'Delhi', status: 'Rejected', requiredBy: formatDate(new Date('2023-10-25')) },
];


export default function AdminRequestsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">All Vendor Requests</h2>
      </div>
      <AdminRequestsClient initialRequests={allRequests} />
    </div>
  )
}
