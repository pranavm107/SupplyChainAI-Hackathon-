'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { StatCard } from "../shared/stat-card";
import { IndianRupee, Package, Truck } from "lucide-react";

interface EarningsData {
    dailyEarnings: { day: string; earnings: number }[];
    weeklySummary: {
        totalDeliveries: number;
        totalEarnings: number;
        averagePerDelivery: number;
    };
    monthlyHistory: { month: string; earnings: number; deliveries: number }[];
}

interface DeliveryEarningsClientProps {
    initialData: EarningsData;
}

const chartConfig = {
    earnings: {
        label: "Earnings (₹)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function DeliveryEarningsClient({ initialData }: DeliveryEarningsClientProps) {
    return (
        <div className="space-y-6">
             <div className="grid gap-4 md:grid-cols-3">
                 <StatCard 
                    title="This Week's Earnings" 
                    value={formatCurrency(initialData.weeklySummary.totalEarnings)} 
                    icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} 
                />
                 <StatCard 
                    title="This Week's Deliveries" 
                    value={initialData.weeklySummary.totalDeliveries} 
                    icon={<Truck className="h-5 w-5 text-muted-foreground" />} 
                />
                 <StatCard 
                    title="Avg. Per Delivery" 
                    value={formatCurrency(initialData.weeklySummary.averagePerDelivery)} 
                    icon={<Package className="h-5 w-5 text-muted-foreground" />} 
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daily Earnings</CardTitle>
                    <CardDescription>Your earnings for the current week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <LineChart data={initialData.dailyEarnings}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                            <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                            <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Monthly History</CardTitle>
                    <CardDescription>A look at your earnings and deliveries over past months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Total Earnings</TableHead>
                                <TableHead>Total Deliveries</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialData.monthlyHistory.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">{row.month}</TableCell>
                                    <TableCell>{formatCurrency(row.earnings)}</TableCell>
                                    <TableCell>{row.deliveries}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
