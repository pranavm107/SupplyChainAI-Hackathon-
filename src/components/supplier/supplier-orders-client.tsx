
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Truck, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MapPlaceholder from "../shared/map-placeholder";

interface ActiveOrder {
    id: string;
    vendor: string;
    item: string;
    quantity: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'In-Transit' | 'Delivered';
    deliveryDate: string;
    pickupStatus: 'Awaiting Pickup' | 'Picked Up';
}

interface OrdersClientProps {
    activeOrders: ActiveOrder[];
}

const statusColor = {
    'Processing': 'bg-yellow-500',
    'Shipped': 'bg-blue-500',
    'In-Transit': 'bg-purple-500',
    'Delivered': 'bg-green-600',
}

const pickupStatusConfig = {
    'Awaiting Pickup': { variant: 'secondary', className: 'bg-orange-500' },
    'Picked Up': { variant: 'default', className: 'bg-green-600' },
}

export default function SupplierOrdersClient({ activeOrders }: OrdersClientProps) {
    return (
        <Tabs defaultValue="orders-list">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders-list">Orders List</TabsTrigger>
                <TabsTrigger value="live-map">Live Dispatch Map</TabsTrigger>
            </TabsList>
            <TabsContent value="orders-list" className="space-y-6 mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Orders</CardTitle>
                        <CardDescription>Manage and track your ongoing deliveries to vendors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Item Details</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Delivery Date</TableHead>
                                        <TableHead>Delivery Status</TableHead>
                                        <TableHead>Pickup Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.vendor}</TableCell>
                                            <TableCell>{order.item} ({order.quantity})</TableCell>
                                            <TableCell>{formatCurrency(order.total)}</TableCell>
                                            <TableCell>{order.deliveryDate}</TableCell>
                                            <TableCell>
                                                <Badge className={statusColor[order.status]}>{order.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={pickupStatusConfig[order.pickupStatus].variant} className={pickupStatusConfig[order.pickupStatus].className}>{order.pickupStatus}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Truck className="mr-2 h-4 w-4" />
                                                            View Delivery Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <AlertCircle className="mr-2 h-4 w-4" />
                                                            Report Pickup Issue
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
            </TabsContent>
            <TabsContent value="live-map" className="mt-4">
               <Card>
                    <CardHeader>
                        <CardTitle>Live Dispatch Map</CardTitle>
                        <CardDescription>Real-time tracking of all outgoing deliveries.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full rounded-md border">
                            <MapPlaceholder />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
