'use client';

import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Line, LineChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { IndianRupee, Percent, ShieldCheck, Truck } from "lucide-react";
import { StatCard } from "../shared/stat-card";
import { formatCurrency } from "@/lib/utils";

interface VendorAnalyticsClientProps {
  initialData: {
    monthlySpend: { month: string; spend: number }[];
    aiSavings: { category: string; value: number, fill: string }[];
    topRequestedItems: { item: string; count: number; avgCost: number }[];
    performanceStats: {
      orderSuccessRate: number;
      avgDeliveryTime: string;
      supplierSatisfaction: number;
    };
  };
}

const spendChartConfig = {
  spend: {
    label: "Spend",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const savingsChartConfig = {
  value: {
    label: "Savings",
  },
  "Bulk Buying": { label: "Bulk Buying", color: "hsl(var(--chart-1))" },
  "Supplier Negotiation": { label: "Supplier Negotiation", color: "hsl(var(--chart-2))" },
  "Alternative Materials": { label: "Alternative Materials", color: "hsl(var(--chart-3))" },
  "Off-Peak Sourcing": { label: "Off-Peak Sourcing", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export default function VendorAnalyticsClient({ initialData }: VendorAnalyticsClientProps) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Analytics</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Spend (All Time)" value={formatCurrency(125430)} icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Total AI Savings" value={formatCurrency(15670)} icon={<Percent className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Order Success Rate" value={`${initialData.performanceStats.orderSuccessRate}%`} icon={<ShieldCheck className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Avg. Delivery Time" value={initialData.performanceStats.avgDeliveryTime} icon={<Truck className="h-5 w-5 text-muted-foreground" />} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Spend</CardTitle>
            <CardDescription>Your total spend over the last six months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={spendChartConfig} className="h-[300px] w-full">
              <LineChart data={initialData.monthlySpend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                <Legend />
                <Line type="monotone" dataKey="spend" stroke="hsl(var(--primary))" strokeWidth={2} name="Spend" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Savings Breakdown</CardTitle>
            <CardDescription>How our AI helps you save money.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={savingsChartConfig} className="h-[300px] w-full">
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="category" formatter={(value, name) => `${name}: ${value}%`} />} />
                <Pie data={initialData.aiSavings} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} innerRadius={60}>
                    {initialData.aiSavings.map((entry) => (
                        <Cell key={entry.category} fill={entry.fill} />
                    ))}
                </Pie>
                <Legend content={<ChartTooltipContent nameKey="category" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Requested Items</CardTitle>
          <CardDescription>The items you source most frequently.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Request Count</TableHead>
                <TableHead>Average Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.topRequestedItems.map((item) => (
                <TableRow key={item.item}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{formatCurrency(item.avgCost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
