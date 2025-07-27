import SupplierDashboardClient from "@/components/supplier/supplier-dashboard-client";

export default function SupplierDashboardPage() {
  const supplierData = {
    name: "Gupta Supplies",
  };
  return <SupplierDashboardClient supplier={supplierData} />;
}
