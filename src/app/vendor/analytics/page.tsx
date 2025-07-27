import VendorAnalyticsClient from "@/components/vendor/vendor-analytics-client";

export default function VendorAnalyticsPage() {
  const analyticsData = {
    monthlySpend: [
      { month: "Jan", spend: 4000 },
      { month: "Feb", spend: 3000 },
      { month: "Mar", spend: 5000 },
      { month: "Apr", spend: 4500 },
      { month: "May", spend: 6000 },
      { month: "Jun", spend: 5500 },
    ],
    aiSavings: [
      { category: "Bulk Buying", value: 40, fill: "hsl(var(--chart-1))" },
      { category: "Supplier Negotiation", value: 30, fill: "hsl(var(--chart-2))" },
      { category: "Alternative Materials", value: 20, fill: "hsl(var(--chart-3))" },
      { category: "Off-Peak Sourcing", value: 10, fill: "hsl(var(--chart-4))" },
    ],
    topRequestedItems: [
      { item: "Potatoes", count: 150, avgCost: 25 },
      { item: "Onions", count: 120, avgCost: 30 },
      { item: "Tomatoes", count: 90, avgCost: 40 },
      { item: "Cooking Oil", count: 80, avgCost: 120 },
      { item: "Besan Flour", count: 70, avgCost: 80 },
    ],
    performanceStats: {
      orderSuccessRate: 98,
      avgDeliveryTime: "1.2 days",
      supplierSatisfaction: 4.8,
    },
  };

  return <VendorAnalyticsClient initialData={analyticsData} />;
}
