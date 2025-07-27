
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/vendor/date-range-picker";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface CompletedOrder {
    id: string;
    vendor: string;
    item: string;
    total: number;
    status: 'Completed' | 'Cancelled';
    date: string;
}

interface HistoryClientProps {
    completedOrders: CompletedOrder[];
}

export default function SupplierHistoryClient({ completedOrders }: HistoryClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and download reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <DateRangePicker className="w-full sm:w-auto" />
                    <Input placeholder="Filter by vendor..." className="w-full sm:w-auto" />
                    <Input placeholder="Filter by item..." className="w-full sm:w-auto" />
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Apply Filters
                    </Button>
                     <Button className="w-full sm:w-auto ml-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Export to CSV
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Completion Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.item}</TableCell>
                                    <TableCell>{order.vendor}</TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Completed' ? 'default' : 'destructive'} className={order.status === 'Completed' ? 'bg-green-600' : ''}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Invoice
                                        </Button>
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
