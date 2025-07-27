'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, Repeat } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/vendor/date-range-picker";
import { formatCurrency } from "@/lib/utils";

interface CompletedRequest {
    id: string;
    item: string;
    supplier: string;
    quantity: string;
    totalSpend: number;
    completionDate: string;
}

interface HistoryClientProps {
    completedRequests: CompletedRequest[];
}

export default function HistoryClient({ completedRequests }: HistoryClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Completed Requests</CardTitle>
                <CardDescription>View your past transactions and download invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <DateRangePicker className="w-full sm:w-auto" />
                    <Input placeholder="Filter by supplier..." className="w-full sm:w-auto" />
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
                                <TableHead>Request ID</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total Spend</TableHead>
                                <TableHead>Completion Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell className="font-medium">{request.id}</TableCell>
                                    <TableCell>{request.item}</TableCell>
                                    <TableCell>{request.supplier}</TableCell>
                                    <TableCell>{request.quantity}</TableCell>
                                    <TableCell>{formatCurrency(request.totalSpend)}</TableCell>
                                    <TableCell>{request.completionDate}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Invoice
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Repeat className="mr-2 h-4 w-4" />
                                            Repeat
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
