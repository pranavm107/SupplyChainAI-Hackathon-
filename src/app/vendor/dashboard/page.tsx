import VendorDashboardClient from "@/components/vendor/vendor-dashboard-client";

export default function VendorDashboardPage() {
  // In a real app, you might fetch initial vendor data here
  const vendorData = {
    name: "Rajesh Kumar",
  };

  return <VendorDashboardClient vendor={vendorData} />;
}
