import DeliveryEarningsClient from "@/components/delivery/delivery-earnings-client";

const earningsData = {
    dailyEarnings: [
        { day: 'Mon', earnings: 1250 },
        { day: 'Tue', earnings: 1500 },
        { day: 'Wed', earnings: 1100 },
        { day: 'Thu', earnings: 1800 },
        { day: 'Fri', earnings: 2100 },
        { day: 'Sat', earnings: 2500 },
        { day: 'Sun', earnings: 900 },
    ],
    weeklySummary: {
        totalDeliveries: 85,
        totalEarnings: 11150,
        averagePerDelivery: 131.18,
    },
    monthlyHistory: [
        { month: 'October', earnings: 45000, deliveries: 340 },
        { month: 'September', earnings: 42500, deliveries: 330 },
        { month: 'August', earnings: 48000, deliveries: 360 },
    ]
};

export default function DeliveryEarningsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Earnings</h2>
      </div>
      <DeliveryEarningsClient initialData={earningsData} />
    </div>
  )
}
