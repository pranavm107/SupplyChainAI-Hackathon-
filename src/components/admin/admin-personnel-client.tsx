'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, UserPlus, Eye, ToggleLeft, ToggleRight, Trash2, Star, Bike } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Personnel {
    id: string;
    name: string;
    status: 'Active' | 'Inactive';
    phone: string;
    avgRating: number;
    totalDeliveries: number;
    location: string;
}

interface PersonnelClientProps {
    personnel: Personnel[];
}

const statusConfig = {
    Active: { variant: 'default', className: 'bg-green-600' },
    Inactive: { variant: 'secondary', className: '' },
} as const;


export default function AdminPersonnelClient({ personnel }: PersonnelClientProps) {
    return (
        <Card>
            <CardHeader className="sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>Delivery Personnel</CardTitle>
                    <CardDescription>View, manage, and assign delivery personnel.</CardDescription>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Personnel
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter by name, location, or ID..."
                        className="max-w-sm"
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Avg. Rating</TableHead>
                                <TableHead>Total Deliveries</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {personnel.map((person) => (
                                <TableRow key={person.id}>
                                    <TableCell className="font-medium">{person.id}</TableCell>
                                    <TableCell>{person.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusConfig[person.status].variant} className={statusConfig[person.status].className}>
                                            {person.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{person.location}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            {person.avgRating}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                         <div className="flex items-center gap-1">
                                            <Bike className="w-4 h-4 text-muted-foreground" />
                                            {person.totalDeliveries}
                                        </div>
                                    </TableCell>
                                    <TableCell>{person.phone}</TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Profile & History
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {person.status === 'Active' ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                                                    {person.status === 'Active' ? 'Disable' : 'Enable'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete Account
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
