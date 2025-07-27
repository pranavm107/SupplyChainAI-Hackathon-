import AdminAnalyticsClient from "@/components/admin/admin-analytics-client";

// In a real application, this data would be fetched from a backend service.
const analyticsData = {
  requestTrends: [
    { name: "Jan", "New Requests": 400, "Fulfilled": 240 },
    { name: "Feb", "New Requests": 300, "Fulfilled": 139 },
    { name: "Mar", "New Requests": 200, "Fulfilled": 380 },
    { name: "Apr", "New Requests": 278, "Fulfilled": 300 },
    { name: "May", "New Requests": 189, "Fulfilled": 480 },
    { name: "Jun", "New Requests": 239, "Fulfilled": 380 },
    { name: "Jul", "New Requests": 349, "Fulfilled": 430 },
  ],
  fulfillmentRate: {
    rate: 89.2,
    total: 5120,
    successful: 4567,
    failed: 553,
  },
  supplierResponse: {
    avgTime: 4.5, // hours
    categories: [
      { name: "< 1hr", value: 45 },
      { name: "1-4 hrs", value: 30 },
      { name: "4-12 hrs", value: 15 },
      { name: "> 12 hrs", value: 10 },
    ]
  },
  vendorGrowth: {
    total: 1250,
    growth: 15, // percent
    thisMonth: 75,
  },
  totalRevenue: 7500000,
};


export default function AdminAnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Platform Analytics</h2>
      </div>
      <AdminAnalyticsClient initialData={analyticsData} />
    </div>
  )
}
