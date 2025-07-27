'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, User, Eye, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Supplier {
    id: string;
    name: string;
    status: 'Active' | 'Inactive' | 'Under Review';
    categories: string[];
    contact: string;
    location: string;
}

interface SuppliersClientProps {
    suppliers: Supplier[];
}

const statusConfig = {
    Active: { variant: 'default', className: 'bg-green-600' },
    Inactive: { variant: 'secondary', className: '' },
    'Under Review': { variant: 'default', className: 'bg-yellow-500' },
} as const;


export default function AdminSuppliersClient({ suppliers }: SuppliersClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Supplier Directory</CardTitle>
                <CardDescription>View and manage all suppliers on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter suppliers by name, category, or location..."
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
                                <TableHead>Categories</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell className="font-medium">{supplier.id}</TableCell>
                                    <TableCell>{supplier.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusConfig[supplier.status].variant} className={statusConfig[supplier.status].className}>
                                            {supplier.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 w-48">
                                            {supplier.categories.map(cat => <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>)}
                                        </div>
                                    </TableCell>
                                    <TableCell>{supplier.location}</TableCell>
                                    <TableCell>{supplier.contact}</TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {supplier.status === 'Active' ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                                                    {supplier.status === 'Active' ? 'Disable' : 'Enable'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete Supplier
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
