import AdminSuppliersClient from '@/components/admin/admin-suppliers-client';

const allSuppliers = [
  {
    id: "SUP-001",
    name: "Gupta Supplies",
    status: "Active",
    categories: ["Vegetables", "Flour", "Spices"],
    contact: "contact@gupta.com",
    location: "Mumbai",
  },
  {
    id: "SUP-002",
    name: "Fresh Veggies Co",
    status: "Active",
    categories: ["Vegetables", "Dairy"],
    contact: "sales@freshveg.co",
    location: "Delhi",
  },
  {
    id: "SUP-003",
    name: "Masala House",
    status: "Active",
    categories: ["Spices", "Herbs"],
    contact: "info@masalahouse.in",
    location: "Bangalore",
  },
  {
    id: "SUP-004",
    name: "Amul Dairy",
    status: "Inactive",
    categories: ["Dairy", "Paneer", "Ghee"],
    contact: "support@amul.com",
    location: "Anand",
  },
  {
    id: "SUP-005",
    name: "Oil & Grain Inc.",
    status: "Active",
    categories: ["Oils", "Grains", "Lentils"],
    contact: "orders@oilgrain.com",
    location: "Mumbai",
  },
  {
    id: "SUP-006",
    name: "Bad Supplies",
    status: "Under Review",
    categories: ["General"],
    contact: "bad@supplies.com",
    location: "Unknown",
  }
];

export default function AdminSuppliersPage() {
  return (
     <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Manage Suppliers</h2>
      </div>
      <AdminSuppliersClient suppliers={allSuppliers} />
    </div>
  )
}
