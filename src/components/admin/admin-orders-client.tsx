'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, AlertTriangle, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "../ui/input";

interface Order {
    id: string;
    vendor: string;
    supplier: string;
    item: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'In-Transit' | 'Delivered' | 'Cancelled';
    deliveryDate: string;
}

interface OrdersClientProps {
    initialOrders: Order[];
}

const statusConfig = {
    Processing: { variant: 'secondary', className: 'bg-yellow-500' },
    Shipped: { variant: 'default', className: 'bg-blue-500' },
    'In-Transit': { variant: 'default', className: 'bg-purple-500' },
    Delivered: { variant: 'default', className: 'bg-green-600' },
    Cancelled: { variant: 'destructive', className: 'bg-red-500' },
} as const;

export default function AdminOrdersClient({ initialOrders }: OrdersClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Monitor and manage all orders across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter orders by ID, vendor, or supplier..."
                        className="max-w-sm"
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Item Details</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Delivery Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.vendor}</TableCell>
                                    <TableCell>{order.supplier}</TableCell>
                                    <TableCell>{order.item}</TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell>{order.deliveryDate}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusConfig[order.status].variant} className={statusConfig[order.status].className}>{order.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    View Communication
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-500 focus:text-orange-500">
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Intervene
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
