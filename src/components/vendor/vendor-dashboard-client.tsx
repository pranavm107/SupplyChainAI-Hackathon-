
'use client';

import { useState } from 'react';
import { BarChart, Briefcase, IndianRupee, Percent, Sparkles, Send, Loader2, PlusCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { StatCard } from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCostOptimizationSuggestions } from '@/ai/flows/cost-optimization-suggestions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface VendorDashboardClientProps {
  vendor: {
    name: string;
  };
}

const frequentItems = [
    { name: "Potatoes", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxQb3RhdG9lc3xlbnwwfHx8fDE3NTM2MzU3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "fresh raw potatoes" },
    { name: "Onions", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxPbmlvbnN8ZW58MHx8fHwxNzUzNjM1Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "red onions" },
    { name: "Tomatoes", img: "https://images.unsplash.com/photo-1606588260160-0c4707ab7db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8VG9tYXRvZXN8ZW58MHx8fHwxNzUzNjM1NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "ripe red tomatoes" },
    { name: "Paneer", img: "https://images.unsplash.com/photo-1630748661719-875c3b7ebfb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8UGFuZWVyfGVufDB8fHx8MTc1MzYzNTY0MHww&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "block of paneer" },
    { name: "Cooking Oil", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxDb29raW5nJTIwT2lsfGVufDB8fHx8MTc1MzYzNTU5OHww&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "bottle cooking oil" },
    { name: "Spice Mix", img: "https://images.unsplash.com/photo-1624935984039-395c058e3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxNaXglMjBzcGljZXMlMjBvbiUyMHJvdW5kJTIwbWV0YWwlMjBwbGF0ZSUyMC0lMjBjb3JpYW5kZXIlMjBzZWVkcyUyQyUyMGdyb3VuZCUyMHJlZCUyMHBlcHBlciUyQyUyMHNhbHQlMkMlMjBibGFjayUyMHBlcHBlciUyQyUyMHJvc2VtYXJ5JTJDJTIwdHVybWVyaWMlMkMlMjBjdXJyeS4lMjBUb3AlMjB2aWV3JTJDJTIwY2xvc2UlMjB1cCUyQyUyMG1ldGFsbCUyMHJ1c3R5JTIwYmFja2dyb3VuZC4lMjBzdG9jayUyMHBob3RvfGVufDB8fHx8MTc1MzYzNTU2OXww&ixlib=rb-4.1.0&q=80&w=1080", data_ai_hint: "aromatic indian spices" },
];

const recentRequests = [
    { id: "REQ-001", material: "Potatoes", date: "2023-10-26", status: "Fulfilled" },
    { id: "REQ-002", material: "Onions", date: "2023-10-25", status: "In-Transit", eta: '15 mins' },
    { id: "REQ-003", material: "Cooking Oil", date: "2023-10-24", status: "Fulfilled" },
    { id: "REQ-004", material: "Spices Mix", date: "2023-10-23", status: "Cancelled" },
]

export default function VendorDashboardClient({ vendor }: VendorDashboardClientProps) {
  const [costRequest, setCostRequest] = useState('');
  const [costSuggestion, setCostSuggestion] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Welcome back, {vendor.name}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Orders" value="5" icon={<Briefcase className="h-5 w-5 text-muted-foreground" />} description="2 more than last week" />
        <StatCard title="Trusted Suppliers" value="12" icon={<Sparkles className="h-5 w-5 text-muted-foreground" />} description="+3 this month" />
        <StatCard title="Total Spend" value={formatCurrency(15230)} icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} description="Month-to-date" />
        <StatCard title="Average Savings" value="12.5%" icon={<Percent className="h-5 w-5 text-muted-foreground" />} description="AI-powered savings" />
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Frequent Items</CardTitle>
                <CardDescription>Quickly add your most-ordered items to a new request.</CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {frequentItems.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/6">
                                <div className="p-1">
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                                            <Image src={item.img} alt={item.name} width={100} height={100} data-ai-hint={item.data_ai_hint} />
                                            <span className="text-sm font-medium p-2">{item.name}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders Trend</CardTitle>
            <CardDescription>Your recent order volume over the past 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full rounded-md border p-4 flex items-center justify-center">
              <Image src="https://placehold.co/600x250.png" alt="Recent Orders Trend Chart" width={600} height={250} className="rounded-md object-cover" data-ai-hint="orders trend chart" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Quick Add Request</CardTitle>
                <CardDescription>Quickly request a new item.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="e.g., Onions" />
                </div>
                 <div>
                    <Label htmlFor="item-qty">Quantity</Label>
                    <Input id="item-qty" placeholder="e.g., 20kg" />
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Request
                </Button>
            </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Live Order Map with Delivery Person</CardTitle>
            <CardDescription>Mini-map view of active deliveries and their routes.</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
            <Image src="https://placehold.co/800x400.png" alt="Live Order Map" width={800} height={400} className="rounded-md object-cover w-full h-full" data-ai-hint="delivery routes map India" />
        </CardContent>
      </Card>
    </div>
  );
}
