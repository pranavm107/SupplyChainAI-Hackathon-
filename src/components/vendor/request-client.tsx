'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, MessageSquare } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from '../ui/badge';

const ongoingRequests = [
    { id: 'REQ-002', items: 'Onions', status: 'Pending', aiSavings: '5%', date: '2023-10-25' },
    { id: 'REQ-009', items: 'Paneer', status: 'Quoted', aiSavings: '12%', date: '2023-10-26' },
    { id: 'REQ-007', items: 'Tomatoes', status: 'Approved', aiSavings: '8%', date: '2023-10-24' },
];

const aiRecommendations = [
    {
        vendor: 'Gupta Supplies',
        price: 2300,
        deliveryTime: '2 days',
        savings: '15%',
    },
    {
        vendor: 'Fresh Veggies Co',
        price: 2450,
        deliveryTime: '1 day',
        savings: '10%',
    },
];

export default function RequestClient() {
    const [date, setDate] = useState<Date>();
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setShowRecommendations(true);
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>New Request</CardTitle>
                            <CardDescription>Submit your sourcing requests and get AI recommendations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="material">Material Name</Label>
                                <Input id="material" placeholder="e.g., Potatoes" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input id="quantity" placeholder="e.g., 50kg" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" placeholder="e.g., Mumbai" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">Required By</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea id="description" placeholder="Any specific quality requirements or brands?" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Getting Recommendations...' : 'Submit Request'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ongoing Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {ongoingRequests.map(req => (
                            <div key={req.id} className="flex justify-between items-center p-2 rounded-md border">
                                <div>
                                    <p className="font-medium">{req.id}: {req.items}</p>
                                    <p className="text-sm text-muted-foreground">Est. Savings: {req.aiSavings}</p>
                                </div>
                                <Badge variant={
                                    req.status === 'Pending' ? 'secondary' :
                                    req.status === 'Quoted' ? 'default' : 'outline'
                                }
                                className={
                                     req.status === 'Quoted' ? 'bg-blue-500 text-white' : ''
                                }
                                >{req.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-3">
                {showRecommendations && (
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Recommendations</CardTitle>
                            <CardDescription>Our AI has found the best options for your request.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {aiRecommendations.map((rec, index) => (
                                <Card key={index} className="bg-muted/40">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{rec.vendor}</CardTitle>
                                        <CardDescription>Potential Savings: <span className="font-bold text-green-600">{rec.savings}</span></CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-semibold text-primary">{formatCurrency(rec.price)}</p>
                                            <p className="text-sm text-muted-foreground">Total Price</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{rec.deliveryTime}</p>
                                            <p className="text-sm text-muted-foreground">Est. Delivery</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-2">
                                        <Button className="w-full">Accept Quote</Button>
                                        <Button variant="outline" className="w-full">
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
