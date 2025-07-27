'use client';

import { Bell, Check, Edit, Star, ThumbsUp, Truck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

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
                <CardTitle>Trust Score Dashboard</CardTitle>
                <CardDescription>Your performance based on vendor feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold">92</span>
                    <span className="text-muted-foreground">/ 100</span>
                </div>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie data={trustScoreData} dataKey="value" nameKey="metric" innerRadius={60} strokeWidth={5}>
                         {trustScoreData.map((entry) => (
                           <Cell key={`cell-${entry.metric}`} fill={entry.fill} />
                         ))}
                      </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Delivery Tracker</CardTitle>
                <CardDescription>Current status of your deliveries.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deliveryTracker.map((delivery) => (
                            <TableRow key={delivery.orderId}>
                                <TableCell>{delivery.orderId}</TableCell>
                                <TableCell>{delivery.vendor}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        delivery.status === 'Delivered' ? 'default' : 
                                        delivery.status === 'In-Transit' ? 'secondary' : 'outline'
                                    } className={
                                        delivery.status === 'Delivered' ? 'bg-green-600' : 
                                        delivery.status === 'In-Transit' ? 'bg-blue-500' : ''
                                    }>{delivery.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Truck className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
