'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, CheckCircle, MapPin, Package, Star, Truck } from "lucide-react";
import Link from "next/link";
import { StatCard } from "../shared/stat-card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MapPlaceholder from "../shared/map-placeholder";

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
        <StatCard 
          title="Pending Deliveries" 
          value={data.summary.pending} 
          icon={<Truck className="h-5 w-5 text-muted-foreground" />} 
        />
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
          <CardHeader className="flex flex-row items-center justify-between">
              <div>
                  <CardTitle>Active Deliveries</CardTitle>
                  <CardDescription>Your current delivery tasks.</CardDescription>
              </div>
              <Link href="/delivery/status">
                  <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </Link>
          </CardHeader>
          <CardContent>
          <Table>
              <TableHeader>
              <TableRow>
                  <TableHead>Delivery ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Drop-off</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {data.activeDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.item}</TableCell>
                  <TableCell>{delivery.pickup}</TableCell>
                  <TableCell>{delivery.dropoff}</TableCell>
                  <TableCell>
                      <Badge variant="default" className={statusConfig[delivery.status]?.className}>
                          {delivery.status}
                      </Badge>
                  </TableCell>
                  <TableCell>{delivery.eta}</TableCell>
                  <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                      <MapPin className="h-4 w-4" />
                      <span className="sr-only">View on map</span>
                      </Button>
                  </TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
          </CardContent>
      </Card>
           
    </div>
  );
}
