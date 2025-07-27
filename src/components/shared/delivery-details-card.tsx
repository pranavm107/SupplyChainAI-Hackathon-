import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Truck, Phone, MapPin, Clock } from "lucide-react";

interface DeliveryDetails {
    personName: string;
    deliveryId: string;
    contactNumber: string;
    vehicleType: string;
    status: 'En Route' | 'Delayed' | 'Delivered' | 'Pending';
    arrivalLocation: string;
    arrivalTime: string;
}

const statusConfig = {
    'En Route': { variant: 'default', className: 'bg-blue-500' },
    'Delayed': { variant: 'destructive', className: 'bg-orange-500' },
    'Delivered': { variant: 'default', className: 'bg-green-600' },
    'Pending': { variant: 'secondary', className: 'bg-yellow-500' },
} as const;


export default function DeliveryDetailsCard({ details }: { details: DeliveryDetails }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
                <CardDescription>Live information for delivery {details.deliveryId}.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{details.personName}</p>
                        <p className="text-muted-foreground">Delivery Person</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{details.contactNumber}</p>
                        <p className="text-muted-foreground">Contact</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{details.vehicleType}</p>
                        <p className="text-muted-foreground">Vehicle</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{details.arrivalTime}</p>
                        <p className="text-muted-foreground">Est. Arrival</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{details.arrivalLocation}</p>
                        <p className="text-muted-foreground">Destination</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                     <div className="w-5" />
                    <div>
                         <Badge variant={statusConfig[details.status].variant} className={statusConfig[details.status].className}>
                            {details.status}
                        </Badge>
                        <p className="text-muted-foreground mt-1">Current Status</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
