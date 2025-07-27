
'use client';

import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Line, LineChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Award, IndianRupee, Percent, Star, ThumbsUp } from "lucide-react";
import { StatCard } from "../shared/stat-card";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface SupplierAnalyticsClientProps {
  initialData: {
    monthlyRevenue: { month: string; revenue: number }[];
    topSuppliedItems: { name: string; value: number, fill: string }[];
    performanceMetrics: {
      responseRate: number;
      fulfillmentRate: number;
      avgRating: number;
    };
    recentFeedback: { vendor: string; rating: number; comment: string }[];
  };
}

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const topItemsChartConfig = {
  value: {
    label: "Supplied",
  },
  Potatoes: { label: "Potatoes", color: "hsl(var(--chart-1))" },
  Onions: { label: "Onions", color: "hsl(var(--chart-2))" },
  Tomatoes: { label: "Tomatoes", color: "hsl(var(--chart-3))" },
  Paneer: { label: "Paneer", color: "hsl(var(--chart-4))" },
  Other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function SupplierAnalyticsClient({ initialData }: SupplierAnalyticsClientProps) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Analytics</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue (All Time)" value={formatCurrency(1254300)} icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Fulfillment Rate" value={`${initialData.performanceMetrics.fulfillmentRate}%`} icon={<ThumbsUp className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Response Rate" value={`${initialData.performanceMetrics.responseRate}%`} icon={<Percent className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Average Rating" value={`${initialData.performanceMetrics.avgRating} / 5`} icon={<Star className="h-5 w-5 text-muted-foreground" />} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Your total revenue over the last six months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
              <LineChart data={initialData.monthlyRevenue} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Supplied Items</CardTitle>
            <CardDescription>Breakdown of your most supplied items.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={topItemsChartConfig} className="h-[300px] w-full">
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="name" formatter={(value, name) => `${name}: ${value}%`} />} />
                <Pie data={initialData.topSuppliedItems} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60}>
                    {initialData.topSuppliedItems.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                    ))}
                </Pie>
                <Legend content={<ChartTooltipContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Vendor Feedback</CardTitle>
          <CardDescription>Latest reviews and ratings from vendors.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.recentFeedback.map((fb) => (
                <TableRow key={fb.vendor}>
                  <TableCell className="font-medium">{fb.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>{fb.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
