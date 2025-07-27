'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, MoreHorizontal, UserPlus, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';

interface Request {
    id: string;
    vendor: string;
    item: string;
    quantity: string;
    location: string;
    status: 'New' | 'In Process' | 'Approved' | 'Rejected';
    requiredBy: string;
}

interface RequestsClientProps {
    initialRequests: Request[];
}

const statusConfig = {
    New: { variant: 'secondary', className: 'bg-blue-500' },
    'In Process': { variant: 'default', className: 'bg-yellow-500' },
    Approved: { variant: 'default', className: 'bg-green-600' },
    Rejected: { variant: 'destructive', className: 'bg-red-500' },
} as const;

export default function AdminRequestsClient({ initialRequests }: RequestsClientProps) {
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Incoming Requests</CardTitle>
                    <CardDescription>Manage and assign all vendor requests from a single place.</CardDescription>
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
                                <TableHead className="text-right">Admin Actions</TableHead>
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
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="text-green-600 focus:text-green-600">
                                                        <Check className="mr-2 h-4 w-4" />
                                                        Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                        <X className="mr-2 h-4 w-4" />
                                                        Decline
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                     <DialogTrigger asChild>
                                                        <DropdownMenuItem onClick={() => setSelectedRequest(req)}>
                                                            <UserPlus className="mr-2 h-4 w-4" />
                                                            Assign Supplier
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Assign Supplier for {selectedRequest?.id}</DialogTitle>
                                                    <DialogDescription>
                                                        Vendor: {selectedRequest?.vendor} | Item: {selectedRequest?.item}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="supplier-id">Supplier ID or Name</Label>
                                                        <Input id="supplier-id" placeholder="e.g., Gupta Supplies" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="deadline">Set Delivery Deadline</Label>
                                                        <Input id="deadline" type="date" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit"><UserPlus className="mr-2 h-4 w-4" />Assign & Notify</Button>
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
