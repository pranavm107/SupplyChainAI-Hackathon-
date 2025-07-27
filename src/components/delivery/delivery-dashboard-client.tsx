'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, CheckCircle, Clock, MapPin, Package, Star, Truck } from "lucide-react";
import Link from "next/link";
import { StatCard } from "../shared/stat-card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import Image from "next/image";

interface DeliveryData {
  summary: {
    pending: number;
    completedToday: number;
    totalEarningsToday: number;
    rating: number;
  };
  activeDeliveries: {
    id: string;
    item: string;
    pickup: string;
    dropoff: string;
    status: string;
    eta: string;
  }[];
}

const routeTasks = [
    { type: 'pickup', location: 'Gupta Supplies', time: '10:00 AM', status: 'Done' },
    { type: 'delivery', location: 'Raju Chaat', time: '11:30 AM', status: 'Pending' },
    { type: 'pickup', location: 'Masala House', time: '01:00 PM', status: 'Pending' },
];


interface DeliveryDashboardClientProps {
  data: DeliveryData;
}

const statusConfig: { [key: string]: { className: string } } = {
  Ongoing: { className: "bg-blue-500" },
  Pending: { className: "bg-yellow-500" },
};

export default function DeliveryDashboardClient({ data }: DeliveryDashboardClientProps) {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">My Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col items-center justify-center p-6">
          <Image src="https://placehold.co/150x150.png" alt="Delivery Completion Progress" width={150} height={150} className="rounded-full" data-ai-hint="progress circle delivery" />
        </Card>
        <StatCard 
          title="Completed Today" 
          value={data.summary.completedToday} 
          icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />} 
        />
        <StatCard 
          title="Today's Earnings" 
          value={formatCurrency(data.summary.totalEarningsToday)} 
          icon={<Package className="h-5 w-5 text-muted-foreground" />} 
        />
        <StatCard 
          title="My Rating" 
          value={`${data.summary.rating} / 5`} 
          icon={<Star className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
            <CardTitle>My Route Today</CardTitle>
            <CardDescription>Your pickups and drop-offs for the day.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {routeTasks.map((task, index) => (
                <Card key={index} className={`p-4 flex items-center justify-between ${task.status === 'Done' ? 'bg-muted/50' : ''}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${task.type === 'pickup' ? 'bg-blue-200' : 'bg-green-200'}`}>
                           <Truck className={`h-5 w-5 ${task.type === 'pickup' ? 'text-blue-700' : 'text-green-700'}`} />
                        </div>
                        <div>
                            <p className="font-semibold">{task.location}</p>
                            <p className="text-sm text-muted-foreground">{task.type === 'pickup' ? 'Pickup' : 'Delivery'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4" /> {task.time}</p>
                        <Badge variant={task.status === 'Done' ? 'default' : 'secondary'} className={task.status === 'Done' ? 'bg-green-600' : 'bg-yellow-500'}>
                            {task.status}
                        </Badge>
                    </div>
                </Card>
            ))}
        </CardContent>
      </Card>
           
       <Card>
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                  <CardTitle>Active Deliveries</CardTitle>
                  <CardDescription>Your current delivery tasks and progress.</CardDescription>
              </div>
              <Link href="/delivery/status">
                  <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </Link>
          </CardHeader>
          <CardContent>
            {data.activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{delivery.id}: {delivery.dropoff}</p>
                        <p className="text-sm text-muted-foreground">ETA: {delivery.eta}</p>
                    </div>
                    <Progress value={delivery.status === 'Ongoing' ? 50 : 25} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Pickup</span>
                        <span>In Transit</span>
                        <span>Delivered</span>
                    </div>
                </div>
            ))}
          </CardContent>
      </Card>
    </div>
  );
}
