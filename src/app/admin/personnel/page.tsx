import AdminPersonnelClient from '@/components/admin/admin-personnel-client';

const allPersonnel = [
  {
    id: "PER-001",
    name: "Suresh Kumar",
    status: "Active",
    phone: "+91 98765 43210",
    avgRating: 4.8,
    totalDeliveries: 152,
    location: "Mumbai",
  },
   {
    id: "PER-002",
    name: "Rina S.",
    status: "Active",
    phone: "+91 98765 43211",
    avgRating: 4.9,
    totalDeliveries: 210,
    location: "Delhi",
  },
  {
    id: "PER-003",
    name: "Amit P.",
    status: "Inactive",
    phone: "+91 98765 43212",
    avgRating: 4.5,
    totalDeliveries: 98,
    location: "Mumbai",
  },
   {
    id: "PER-004",
    name: "Priya Sharma",
    status: "Active",
    phone: "+91 98765 43213",
    avgRating: 4.7,
    totalDeliveries: 180,
    location: "Bangalore",
  },
];

export default function AdminPersonnelPage() {
  return (
     <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Manage Delivery Personnel</h2>
      </div>
      <AdminPersonnelClient personnel={allPersonnel} />
    </div>
  )
}
