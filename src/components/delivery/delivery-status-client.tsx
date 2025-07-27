'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Camera, Check, MoreHorizontal, Pen, Signature, Truck, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Input } from '../ui/input';

interface Delivery {
    id: string;
    vendor: string;
    status: 'Pending' | 'Ongoing' | 'Delivered' | 'Cancelled' | 'Delayed';
}

interface DeliveryStatusClientProps {
    deliveries: Delivery[];
}

const statusConfig: { [key: string]: { variant: 'default' | 'secondary' | 'destructive', className: string } } = {
    Pending: { variant: 'secondary', className: 'bg-yellow-500' },
    Ongoing: { variant: 'default', className: 'bg-blue-500' },
    Delivered: { variant: 'default', className: 'bg-green-600' },
    Cancelled: { variant: 'destructive', className: '' },
    Delayed: { variant: 'destructive', className: 'bg-orange-500' },
};

export default function DeliveryStatusClient({ deliveries: initialDeliveries }: DeliveryStatusClientProps) {
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
    const [activeTab, setActiveTab] = useState('All');

    const filteredDeliveries = deliveries.filter(d => activeTab === 'All' || d.status === activeTab);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Deliveries</CardTitle>
                <CardDescription>Update the status of your assigned deliveries and upload proof.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex space-x-1 border-b mb-4">
                    {['All', 'Ongoing', 'Delivered', 'Cancelled'].map(tab => (
                        <Button 
                            key={tab} 
                            variant={activeTab === tab ? 'default' : 'ghost'}
                            onClick={() => setActiveTab(tab)}
                            className={activeTab === tab ? 'bg-primary text-primary-foreground' : ''}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Delivery ID</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                                <TableCell className="font-medium">{delivery.id}</TableCell>
                                <TableCell>{delivery.vendor}</TableCell>
                                <TableCell>
                                    <Badge variant={statusConfig[delivery.status]?.variant} className={statusConfig[delivery.status]?.className}>
                                        {delivery.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                             <Button variant="ghost" size="icon" onClick={() => setSelectedDelivery(delivery)}>
                                                <Pen className="h-4 w-4" />
                                                <span className="sr-only">Update Status</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Update Status for {selectedDelivery?.id}</DialogTitle>
                                                <DialogDescription>
                                                    Select the new status and provide proof if necessary.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="status">New Status</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="picked_up"><Truck className="inline-block mr-2 h-4 w-4" />Picked Up</SelectItem>
                                                            <SelectItem value="in_transit"><Truck className="inline-block mr-2 h-4 w-4" />In Transit</SelectItem>
                                                            <SelectItem value="delivered"><Check className="inline-block mr-2 h-4 w-4" />Delivered</SelectItem>
                                                            <SelectItem value="delayed"><X className="inline-block mr-2 h-4 w-4" />Delayed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Proof of Delivery</Label>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" className="flex-1"><Camera className="mr-2 h-4 w-4" />Upload Photo</Button>
                                                        <Button variant="outline" className="flex-1"><Signature className="mr-2 h-4 w-4" />Get Signature</Button>
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="otp">Enter OTP Code</Label>
                                                    <Input id="otp" placeholder="Enter 4-digit OTP from vendor" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Update Status</Button>
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
    );
}
