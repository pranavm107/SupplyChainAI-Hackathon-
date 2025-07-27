'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, FileText, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


interface ActiveOrder {
    id: string;
    item: string;
    quantity: string;
    supplier: string;
    status: 'Processing' | 'Dispatched' | 'In-Transit' | 'Delivered';
    eta: string;
}

interface OrdersClientProps {
    activeOrders: ActiveOrder[];
}

const statusProgress = {
    'Processing': 25,
    'Dispatched': 50,
    'In-Transit': 75,
    'Delivered': 100,
}

const statusColor = {
    'Processing': 'bg-yellow-500',
    'Dispatched': 'bg-blue-500',
    'In-Transit': 'bg-purple-500',
    'Delivered': 'bg-green-600',
}

export default function OrdersClient({ activeOrders }: OrdersClientProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Active Orders</CardTitle>
                    <CardDescription>Track your placed orders and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>ETA</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.item} ({order.quantity})</TableCell>
                                        <TableCell>{order.supplier}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColor[order.status]}>{order.status}</Badge>
                                        </TableCell>
                                        <TableCell>{order.eta}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon"><FileText className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Delivery Timeline</CardTitle>
                    <CardDescription>Visual progress tracker for each active order.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {activeOrders.map(order => (
                        <div key={order.id}>
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium">{order.id} - {order.item}</p>
                                <p className="text-sm text-muted-foreground">{order.status}</p>
                            </div>
                            <Progress value={statusProgress[order.status]} className="h-2" />
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="ml-auto">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Report an Issue
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Report an Issue</DialogTitle>
                                <DialogDescription>
                                    Report delays, disputes, or quality issues for an order.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                               <div className="grid gap-2">
                                    <Label htmlFor="order-id">Order ID</Label>
                                    <Input id="order-id" placeholder="e.g., ORD-102" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="issue-description">Issue Description</Label>
                                    <Textarea id="issue-description" placeholder="Describe the issue in detail."/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Submit Report</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
}
