'use client';

import { Bell, Check, Edit, Star, ThumbsUp, Truck, PackagePlus, PieChart as PieChartIcon, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SupplierDashboardClientProps {
  supplier: {
    name: string;
  };
}

const pendingRequests = [
    { id: 'REQ-005', vendor: 'Raju Chaat', item: 'Tomatoes', qty: '20kg', date: '2023-10-27' },
    { id: 'REQ-006', vendor: 'Sita Snacks', item: 'Besan Flour', qty: '50kg', date: '2023-10-27' },
    { id: 'REQ-007', vendor: 'Mumbai Vada Pav', item: 'Potatoes', qty: '100kg', date: '2023-10-26' },
];

const deliveryTracker = [
    { orderId: 'ORD-101', status: 'Delivered', vendor: 'Raju Chaat' },
    { orderId: 'ORD-102', status: 'In-Transit', vendor: 'Sita Snacks' },
    { orderId: 'ORD-103', status: 'Pending', vendor: 'Kolkata Rolls' },
];

const trustScoreData = [
  { metric: 'Fulfillment', value: 95, fill: 'var(--color-fulfillment)' },
  { metric: 'Pricing', value: 88, fill: 'var(--color-pricing)' },
  { metric: 'Quality', value: 92, fill: 'var(--color-quality)' },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  fulfillment: {
    label: 'Fulfillment',
    color: 'hsl(var(--chart-1))',
  },
  pricing: {
    label: 'Pricing',
    color: 'hsl(var(--chart-2))',
  },
  quality: {
    label: 'Quality',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const stockLevels = [
    { name: 'Vegetables', level: 80, color: 'bg-green-500' },
    { name: 'Dairy', level: 60, color: 'bg-blue-500' },
    { name: 'Spices', level: 45, color: 'bg-yellow-500' },
    { name: 'Oils', level: 25, color: 'bg-red-500' },
];

const topItemsData = [
  { name: 'Potatoes', value: 40, fill: "hsl(var(--chart-1))" },
  { name: 'Onions', value: 25, fill: "hsl(var(--chart-2))" },
  { name: 'Tomatoes', value: 15, fill: "hsl(var(--chart-3))" },
  { name: 'Paneer', value: 10, fill: "hsl(var(--chart-4))" },
  { name: 'Other', value: 10, fill: "hsl(var(--chart-5))" },
];

const topItemsChartConfig = {
  value: { label: 'Supplied' },
  Potatoes: { label: 'Potatoes', color: 'hsl(var(--chart-1))' },
  Onions: { label: 'Onions', color: 'hsl(var(--chart-2))' },
  Tomatoes: { label: 'Tomatoes', color: 'hsl(var(--chart-3))' },
  Paneer: { label: 'Paneer', color: 'hsl(var(--chart-4))' },
  Other: { label: 'Other', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;


export default function SupplierDashboardClient({ supplier }: SupplierDashboardClientProps) {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Welcome, {supplier.name}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Pending Requests from Vendors</CardTitle>
                <CardDescription>Respond to new requests for materials.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingRequests.map((req) => (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.vendor}</TableCell>
                                <TableCell>{req.item}</TableCell>
                                <TableCell>{req.qty}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon"><Check className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full"><ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-300"/></div>
                    <p className="text-sm">Raju Chaat accepted your quote for Tomatoes.</p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full"><Bell className="h-4 w-4 text-blue-600 dark:text-blue-300"/></div>
                    <p className="text-sm">New vendor "Delhi Sweets" joined your region.</p>
                </div>
                 <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full"><Star className="h-4 w-4 text-yellow-600 dark:text-yellow-300"/></div>
                    <p className="text-sm">You received a 5-star review from Mumbai Vada Pav.</p>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Stock Levels</CardTitle>
                <CardDescription>Current inventory status by category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {stockLevels.map((stock) => (
                    <div key={stock.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{stock.name}</span>
                            <span>{stock.level}%</span>
                        </div>
                        <Progress value={stock.level} className="h-2 [&>*]:bg-transparent" style={{ background: `linear-gradient(to right, ${stock.color} ${stock.level}%, hsl(var(--muted)) ${stock.level}%)` }} />
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Manage Inventory
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Top Requested Items</CardTitle>
                <CardDescription>Breakdown of most popular items.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={topItemsChartConfig} className="mx-auto aspect-square h-[250px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={(value) => `${value}%`} hideLabel />} />
                        <Pie data={topItemsData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            {topItemsData.map((entry) => (
                               <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Delivery Dispatch</CardTitle>
                <CardDescription>Drag to assign deliveries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg flex justify-between items-center cursor-move bg-card">
                    <span>Order #ORD-202</span>
                    <GitBranch className="h-5 w-5 text-muted-foreground" />
                    <Badge>Suresh K.</Badge>
                </div>
                 <div className="p-3 border rounded-lg flex justify-between items-center cursor-move bg-card">
                    <span>Order #ORD-203</span>
                    <GitBranch className="h-5 w-5 text-muted-foreground" />
                    <Badge>Rina S.</Badge>
                </div>
                 <div className="p-3 border rounded-lg flex justify-between items-center cursor-move bg-card">
                    <span>Order #ORD-204</span>
                     <GitBranch className="h-5 w-5 text-muted-foreground" />
                    <Badge>Amit P.</Badge>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
