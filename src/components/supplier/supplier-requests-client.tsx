
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Hand, MoreHorizontal, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface VendorRequest {
    id: string;
    vendor: string;
    item: string;
    quantity: string;
    location: string;
    status: 'Pending' | 'Responded' | 'Accepted';
    requiredBy: string;
}

interface RequestsClientProps {
    initialRequests: VendorRequest[];
}

const statusConfig = {
    Pending: { variant: 'secondary', className: 'bg-yellow-500' },
    Responded: { variant: 'default', className: 'bg-blue-500' },
    Accepted: { variant: 'default', className: 'bg-green-600' },
} as const;

export default function SupplierRequestsClient({ initialRequests }: RequestsClientProps) {
    const [selectedRequest, setSelectedRequest] = useState<VendorRequest | null>(null);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Incoming Requests</CardTitle>
                    <CardDescription>Respond to vendor requests to create orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Item (Qty)</TableHead>
                                <TableHead>Required By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialRequests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">{req.id}</TableCell>
                                    <TableCell>{req.vendor}</TableCell>
                                    <TableCell>{req.item} ({req.quantity})</TableCell>
                                    <TableCell>{req.requiredBy}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusConfig[req.status].variant} className={statusConfig[req.status].className}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={req.status !== 'Pending'}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onClick={() => setSelectedRequest(req)}>
                                                            <Hand className="mr-2 h-4 w-4" />
                                                            Provide Quote
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <X className="mr-2 h-4 w-4" />
                                                        Decline
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Provide Quote for {selectedRequest?.item}</DialogTitle>
                                                    <DialogDescription>
                                                        Vendor: {selectedRequest?.vendor} | Required by: {selectedRequest?.requiredBy}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="price">Your Price (INR)</Label>
                                                        <Input id="price" type="number" placeholder="e.g., 2500" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="delivery-date">Estimated Delivery Date</Label>
                                                        <Input id="delivery-date" type="date" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit"><Check className="mr-2 h-4 w-4" />Submit Quote</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
