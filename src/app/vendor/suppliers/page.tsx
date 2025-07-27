import SuppliersClient from '@/components/vendor/suppliers-client';

const suppliers = [
  {
    name: "Gupta Supplies",
    trustScore: 95,
    responseRate: 98,
    categories: ["Vegetables", "Flour", "Spices"],
    logoUrl: "https://placehold.co/40x40.png"
  },
  {
    name: "Fresh Veggies Co",
    trustScore: 92,
    responseRate: 95,
    categories: ["Vegetables", "Dairy"],
    logoUrl: "https://placehold.co/40x40.png"
  },
  {
    name: "Masala House",
    trustScore: 90,
    responseRate: 99,
    categories: ["Spices", "Herbs"],
    logoUrl: "https://placehold.co/40x40.png"
  },
  {
    name: "Amul Dairy",
    trustScore: 97,
    responseRate: 92,
    categories: ["Dairy", "Paneer", "Ghee"],
    logoUrl: "https://placehold.co/40x40.png"
  },
  {
    name: "Oil & Grain Inc.",
    trustScore: 88,
    responseRate: 94,
    categories: ["Oils", "Grains", "Lentils"],
    logoUrl: "https://placehold.co/40x40.png"
  },
  {
    name: "Daily Needs Store",
    trustScore: 85,
    responseRate: 90,
    categories: ["General", "Packaging"],
    logoUrl: "https://placehold.co/40x40.png"
  }
];

export default function VendorSuppliersPage() {
  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Suppliers</h2>
      </div>
      <SuppliersClient suppliers={suppliers} />
    </div>
  )
}
