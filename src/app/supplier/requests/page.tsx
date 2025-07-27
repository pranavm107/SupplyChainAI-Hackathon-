import SupplierRequestsClient from "@/components/supplier/supplier-requests-client";
import { formatDate } from "@/lib/utils";

const vendorRequests = [
    { id: 'REQ-005', vendor: 'Raju Chaat', item: 'Tomatoes', quantity: '20kg', location: 'Mumbai', status: 'Pending', requiredBy: formatDate(new Date('2023-10-27')) },
    { id: 'REQ-006', vendor: 'Sita Snacks', item: 'Besan Flour', quantity: '50kg', location: 'Delhi', status: 'Pending', requiredBy: formatDate(new Date('2023-10-27')) },
    { id: 'REQ-007', vendor: 'Mumbai Vada Pav', item: 'Potatoes', quantity: '100kg', location: 'Mumbai', status: 'Responded', requiredBy: formatDate(new Date('2023-10-26')) },
    { id: 'REQ-008', vendor: 'Kolkata Rolls', item: 'Mustard Oil', quantity: '15L', location: 'Kolkata', status: 'Accepted', requiredBy: formatDate(new Date('2023-10-25')) },
];

export default function SupplierRequestsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Vendor Requests</h2>
      </div>
      <SupplierRequestsClient initialRequests={vendorRequests} />
    </div>
  )
}
