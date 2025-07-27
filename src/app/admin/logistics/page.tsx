import AdminLogisticsMap from "@/components/admin/admin-logistics-map";

export default function AdminLogisticsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Logistics & Dispatch Map</h2>
      </div>
      <AdminLogisticsMap />
    </div>
  )
}
