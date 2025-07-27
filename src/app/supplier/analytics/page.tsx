import SupplierAnalyticsClient from "@/components/supplier/supplier-analytics-client";

const analyticsData = {
  monthlyRevenue: [
    { month: "Jan", revenue: 140000 },
    { month: "Feb", revenue: 180000 },
    { month: "Mar", revenue: 160000 },
    { month: "Apr", revenue: 210000 },
    { month: "May", revenue: 250000 },
    { month: "Jun", revenue: 230000 },
  ],
  topSuppliedItems: [
    { name: "Potatoes", value: 40, fill: "hsl(var(--chart-1))" },
    { name: "Onions", value: 25, fill: "hsl(var(--chart-2))" },
    { name: "Tomatoes", value: 15, fill: "hsl(var(--chart-3))" },
    { name: "Paneer", value: 10, fill: "hsl(var(--chart-4))" },
    { name: "Other", value: 10, fill: "hsl(var(--chart-5))" },
  ],
  performanceMetrics: {
    responseRate: 98,
    fulfillmentRate: 95,
    avgRating: 4.8,
  },
  recentFeedback: [
    { vendor: "Raju Chaat", rating: 5, comment: "Excellent quality and fast delivery!" },
    { vendor: "Sita Snacks", rating: 4, comment: "Good service, but prices could be more competitive." },
    { vendor: "Mumbai Vada Pav", rating: 5, comment: "Always reliable." },
  ]
};


export default function SupplierAnalyticsPage() {
  return <SupplierAnalyticsClient initialData={analyticsData} />;
}
