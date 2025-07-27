'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Send, Star, Zap } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Supplier {
    name: string;
    trustScore: number;
    responseRate: number;
    categories: string[];
    logoUrl: string;
}

interface SuppliersClientProps {
    suppliers: Supplier[];
}

export default function SuppliersClient({ suppliers }: SuppliersClientProps) {
    return (
        <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Refine your search</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vegetables">Vegetables</SelectItem>
                                    <SelectItem value="dairy">Dairy</SelectItem>
                                    <SelectItem value="spices">Spices</SelectItem>
                                    <SelectItem value="oils">Oils</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Regions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mumbai">Mumbai</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="bangalore">Bangalore</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-3 space-y-6">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search suppliers by name or category..." className="pl-10" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {suppliers.map((supplier) => (
                        <Card key={supplier.name} className="flex flex-col">
                            <CardHeader className="flex-row items-start gap-4 space-y-0">
                                <Image src={supplier.logoUrl} alt={`${supplier.name} logo`} width={40} height={40} className="rounded-full" data-ai-hint="company logo" />
                                <div>
                                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> {supplier.trustScore}</span>
                                        <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-blue-500" /> {supplier.responseRate}%</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm font-semibold mb-2">Top Categories:</p>
                                <div className="flex flex-wrap gap-1">
                                    {supplier.categories.map(cat => <Badge key={cat} variant="secondary">{cat}</Badge>)}
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col sm:flex-row gap-2">
                                <Button size="sm" className="w-full">View More</Button>
                                <Button size="sm" variant="outline" className="w-full"><Send className="mr-2 h-4 w-4" /> Request</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
