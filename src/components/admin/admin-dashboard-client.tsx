'use client';

import type { AdminAiAnalyticsOutput } from "@/ai/flows/admin-ai-analytics";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Bot, CheckCircle, Languages, MoreHorizontal, ShoppingCart, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AdminDashboardClientProps {
  initialData: AdminAiAnalyticsOutput;
}

const users = [
    { id: 'USR-001', name: 'Rajesh Kumar', type: 'Vendor', status: 'Active' },
    { id: 'USR-002', name: 'Gupta Supplies', type: 'Supplier', status: 'Active' },
    { id: 'USR-003', name: 'Sita Snacks', type: 'Vendor', status: 'Inactive' },
];

const recommendationChartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const languageChartConfig = {
  count: {
    label: "Count",
  },
  English: { label: "English", color: "hsl(var(--chart-1))" },
  Hindi: { label: "Hindi", color: "hsl(var(--chart-2))" },
  Tamil: { label: "Tamil", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function AdminDashboardClient({ initialData }: AdminDashboardClientProps) {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Vendors" value="1,250" icon={<Users className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Total Suppliers" value="340" icon={<Users className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Total Requests" value="5,678" icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Fulfilled Orders" value="5,120" icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />} />
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Request Flow Monitor</CardTitle>
            <CardDescription>Real-time visualization of the procurement pipeline.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between items-center text-center text-sm p-4 rounded-lg bg-muted">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">150</div><div>New Requests</div>
                </div>
                <div className="text-muted-foreground">&rarr;</div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">145</div><div>AI Processing</div>
                </div>
                <div className="text-muted-foreground">&rarr;</div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">140</div><div>Quotes Sent</div>
                </div>
                <div className="text-muted-foreground">&rarr;</div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">120</div><div>Orders Placed</div>
                </div>
                <div className="text-muted-foreground">&rarr;</div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">115</div><div>Fulfilled</div>
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>AI Analytics</CardTitle>
                <CardDescription>Performance and usage of the AI system.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                    <h3 className="text-md font-semibold mb-2">Top Cost-Saving Recommendations</h3>
                    <ChartContainer config={recommendationChartConfig} className="h-[200px] w-full">
                        <BarChart data={initialData.topCostSavingRecommendations} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="recommendation" type="category" tickLine={false} axisLine={false} width={120} />
                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div>
                     <h3 className="text-md font-semibold mb-2">Languages Used</h3>
                    <ChartContainer config={languageChartConfig} className="h-[200px] w-full">
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="language" hideLabel />} />
                            <Pie data={initialData.languagesUsed} dataKey="count" nameKey="language">
                                {initialData.languagesUsed.map((entry) => (
                                    <Cell key={entry.language} fill={`var(--color-${entry.language})`} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <StatCard title="Total AI Chats" value={initialData.aiChatUsageStatistics.totalChats} icon={<Bot className="h-5 w-5 text-muted-foreground" />} />
                    <StatCard title="Avg. Chat Length" value={`${initialData.aiChatUsageStatistics.averageChatLength} words`} icon={<Activity className="h-5 w-5 text-muted-foreground" />} />
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Overview of vendors and suppliers on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell><Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-600' : ''}>{user.status}</Badge></TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Feedback</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
