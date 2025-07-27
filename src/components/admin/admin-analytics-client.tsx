'use client';

import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Cell, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { StatCard } from "../shared/stat-card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, CheckCircle, Clock, Users, IndianRupee } from "lucide-react";
import Image from "next/image";

interface AdminAnalyticsClientProps {
  initialData: {
    requestTrends: { name: string; "New Requests": number; "Fulfilled": number }[];
    fulfillmentRate: { rate: number; total: number; successful: number; failed: number };
    supplierResponse: { avgTime: number; categories: { name: string; value: number }[] };
    vendorGrowth: { total: number; growth: number; thisMonth: number };
    totalRevenue: number;
  };
}

const requestTrendsChartConfig = {
  "New Requests": {
    label: "New Requests",
    color: "hsl(var(--chart-1))",
  },
  "Fulfilled": {
    label: "Fulfilled",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const supplierResponseChartConfig = {
  value: { label: 'Responses' },
  '< 1hr': { label: '< 1hr', color: 'hsl(var(--chart-1))' },
  '1-4 hrs': { label: '1-4 hrs', color: 'hsl(var(--chart-2))' },
  '4-12 hrs': { label: '4-12 hrs', color: 'hsl(var(--chart-3))' },
  '> 12 hrs': { label: '> 12 hrs', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

export default function AdminAnalyticsClient({ initialData }: AdminAnalyticsClientProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Revenue" value={formatCurrency(initialData.totalRevenue)} icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} description="All-time revenue" />
        <StatCard title="Vendor Growth" value={`${initialData.vendorGrowth.growth}%`} icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />} description={`+${initialData.vendorGrowth.thisMonth} this month`} />
        <StatCard title="Total Vendors" value={initialData.vendorGrowth.total} icon={<Users className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Fulfillment Rate" value={`${initialData.fulfillmentRate.rate}%`} icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Avg. Supplier Response" value={`${initialData.supplierResponse.avgTime} hrs`} icon={<Clock className="h-5 w-5 text-muted-foreground" />} />
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Performance Summary Chart</CardTitle>
          <CardDescription>An overview of key platform metrics.</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
            <Image src="https://placehold.co/1200x400.png" alt="Performance Summary Chart" width={1200} height={400} className="rounded-md object-cover" data-ai-hint="dashboard summary chart" />
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Trends</CardTitle>
            <CardDescription>Daily/monthly request volume and fulfillment.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={requestTrendsChartConfig} className="h-[300px] w-full">
              <BarChart data={initialData.requestTrends}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="New Requests" fill="hsl(var(--chart-1))" radius={4} />
                <Bar dataKey="Fulfilled" fill="hsl(var(--chart-2))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Supplier Response Time</CardTitle>
            <CardDescription>Breakdown of how quickly suppliers respond to requests.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={supplierResponseChartConfig} className="h-[300px] w-full">
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="name" formatter={(value, name) => `${name}: ${value}%`} />} />
                <Pie data={initialData.supplierResponse.categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60}>
                    {initialData.supplierResponse.categories.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={`var(--color-${entry.name})`} />
                    ))}
                </Pie>
                <Legend content={<ChartTooltipContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
