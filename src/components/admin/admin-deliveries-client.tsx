'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, AlertTriangle, MessageSquare, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

interface Delivery {
    id: string;
    orderId: string;
    vendor: string;
    supplier: string;
    deliveryPerson: string;
    status: 'Pending Pickup' | 'Shipped' | 'In-Transit' | 'Delivered' | 'Cancelled';
    lastUpdate: string;
}

interface DeliveriesClientProps {
    initialDeliveries: Delivery[];
}

const statusConfig = {
    'Pending Pickup': { variant: 'secondary', className: 'bg-yellow-500' },
    'Shipped': { variant: 'default', className: 'bg-blue-500' },
    'In-Transit': { variant: 'default', className: 'bg-purple-500' },
    'Delivered': { variant: 'default', className: 'bg-green-600' },
    'Cancelled': { variant: 'destructive', className: 'bg-red-500' },
} as const;

export default function AdminDeliveriesClient({ initialDeliveries }: DeliveriesClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Deliveries</CardTitle>
                <CardDescription>Monitor and manage all deliveries across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 items-center py-4">
                    <Input
                        placeholder="Filter by ID, vendor, supplier..."
                        className="max-w-sm"
                    />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(statusConfig).map(status => (
                                <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Delivery ID</TableHead>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Delivery Person</TableHead>
                                <TableHead>Last Update</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialDeliveries.map((delivery) => (
                                <TableRow key={delivery.id}>
                                    <TableCell className="font-medium">{delivery.id}</TableCell>
                                    <TableCell>{delivery.orderId}</TableCell>
                                    <TableCell>{delivery.vendor}</TableCell>
                                    <TableCell>{delivery.supplier}</TableCell>
                                    <TableCell>{delivery.deliveryPerson}</TableCell>
                                    <TableCell>{delivery.lastUpdate}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusConfig[delivery.status].variant} className={statusConfig[delivery.status].className}>{delivery.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <MapPin className="mr-2 h-4 w-4" />
                                                    Track Live
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    View Logs
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-500 focus:text-orange-500">
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Flag Issue
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
