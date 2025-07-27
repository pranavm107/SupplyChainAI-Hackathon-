
'use client';

import * as React from 'react';
import { useState, useEffect, useMemo, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bike, Phone, Truck, User, Warehouse, Home } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

const supplierLocation: LatLngExpression = [19.0760, 72.8777]; // Gupta Supplies, Mumbai

const mockDeliveries = [
    {
        deliveryId: 'DEL-SUP-01',
        orderId: 'ORD-201',
        deliveryPerson: {
            id: 'DP-01',
            name: 'Suresh Kumar',
            phone: '+91 98765 43210',
            vehicleType: 'Bike',
            coords: [19.0476, 72.8528] as LatLngExpression,
        },
        vendor: {
            name: 'Raju Chaat',
            address: 'Dadar, Mumbai',
            coords: [19.0176, 72.8478] as LatLngExpression,
        },
        status: 'In-Transit',
        eta: '12 mins',
    },
    {
        deliveryId: 'DEL-SUP-02',
        orderId: 'ORD-203',
        deliveryPerson: {
            id: 'DP-02',
            name: 'Rina S.',
            phone: '+91 98765 43211',
            vehicleType: 'Van',
            coords: [19.1036, 72.8657] as LatLngExpression,
        },
        vendor: {
            name: 'Mumbai Vada Pav',
            address: 'Andheri, Mumbai',
            coords: [19.1197, 72.8464] as LatLngExpression,
        },
        status: 'In-Transit',
        eta: '25 mins',
    },
     {
        deliveryId: 'DEL-SUP-03',
        orderId: 'ORD-202',
        deliveryPerson: {
            id: 'DP-04',
            name: 'Priya Sharma',
            phone: '+91 98765 43213',
            vehicleType: 'Bike',
            coords: [19.0760, 72.8777] as LatLngExpression, // Still at warehouse
        },
        vendor: {
            name: 'Sita Snacks',
            address: 'Bandra, Mumbai',
            coords: [19.0596, 72.8295] as LatLngExpression,
        },
        status: 'Awaiting Pickup',
        eta: '5 mins to depart',
    }
];

type Delivery = typeof mockDeliveries[0];

const statusConfig: { [key: string]: { color: string; markerColor: string } } = {
  'Awaiting Pickup': { color: 'bg-yellow-500', markerColor: 'yellow' },
  'In-Transit': { color: 'bg-blue-500', markerColor: 'blue' },
  'Delivered': { color: 'bg-green-500', markerColor: 'green' },
};

const VehicleIcon = ({ type }: { type: string }) =>
  type === 'Bike' ? <Bike className="h-4 w-4" /> : <Truck className="h-4 w-4" />;

const createMarkerIcon = (type: 'delivery' | 'supplier' | 'vendor', status?: string) => {
    let iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png';
    if (type === 'supplier') {
        iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';
    } else if (type === 'vendor') {
        iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    } else if (status) {
        const markerColor = statusConfig[status]?.markerColor || 'grey';
        iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`;
    }

    return new Icon({
        iconUrl,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const MapUpdater = ({ center, deliveries }: { center: LatLngExpression, deliveries: Delivery[] }) => {
    const map = useMap();
    useEffect(() => {
        if (deliveries.length > 0) {
            const bounds = deliveries.map(d => d.deliveryPerson.coords);
            if (bounds.length > 0) {
                 map.fitBounds([...bounds, supplierLocation] as LatLngExpression[], { padding: [50, 50] });
            }
        } else {
            map.flyTo(center, 12);
        }
    }, [center, deliveries, map]);
    return null;
};

const DeliveryMarkers = memo(({ deliveries }: { deliveries: Delivery[] }) => {
    return (
        <>
            {/* Supplier Marker */}
            <Marker position={supplierLocation} icon={createMarkerIcon('supplier')}>
                <Popup>
                    <div className="space-y-1">
                        <h3 className="font-bold text-base flex items-center gap-2"><Warehouse className="h-4 w-4" />Your Warehouse</h3>
                        <p className="text-sm">Santacruz East, Mumbai</p>
                    </div>
                </Popup>
            </Marker>

            {deliveries.map(delivery => (
                <Marker key={delivery.deliveryId} position={delivery.deliveryPerson.coords} icon={createMarkerIcon('delivery', delivery.status)}>
                    <Popup>
                        <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <Image src="https://placehold.co/40x40.png" alt={delivery.deliveryPerson.name} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                                <div>
                                    <h3 className="font-bold text-base">{delivery.deliveryPerson.name}</h3>
                                    <p className="flex items-center gap-2 text-xs"><VehicleIcon type={delivery.deliveryPerson.vehicleType} />{delivery.deliveryPerson.vehicleType}</p>
                                </div>
                            </div>
                            <p className="text-sm"><strong>Status:</strong> <Badge variant="default" className={statusConfig[delivery.status].color}>{delivery.status}</Badge></p>
                            <p className="text-sm"><strong>ETA:</strong> {delivery.eta}</p>
                            <p className="text-sm"><strong>Order ID:</strong> {delivery.orderId}</p>
                            <p className="text-sm"><strong>Destination:</strong> {delivery.vendor.name}</p>
                            <Button size="sm" className="w-full flex items-center gap-2" asChild>
                                <a href={`tel:${delivery.deliveryPerson.phone}`}><Phone className="h-4 w-4" /> Contact Driver</a>
                            </Button>
                        </div>
                    </Popup>
                </Marker>
            ))}

             {/* Vendor Markers */}
             {deliveries.map(delivery => (
                <Marker key={delivery.vendor.name} position={delivery.vendor.coords} icon={createMarkerIcon('vendor')}>
                    <Popup>
                        <div className="space-y-1">
                            <h3 className="font-bold text-base flex items-center gap-2"><Home className="h-4 w-4" />{delivery.vendor.name}</h3>
                            <p className="text-sm">{delivery.vendor.address}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
});
DeliveryMarkers.displayName = 'DeliveryMarkers';


const RoutePolylines = memo(({ deliveries }: { deliveries: Delivery[] }) => {
    return (
        <>
            {deliveries.map(delivery => (
                <Polyline
                    key={delivery.deliveryId}
                    positions={[
                        supplierLocation,
                        delivery.deliveryPerson.coords,
                        delivery.vendor.coords
                    ]}
                    color={statusConfig[delivery.status]?.markerColor || 'grey'}
                    dashArray="5, 10"
                />
            ))}
        </>
    );
});
RoutePolylines.displayName = 'RoutePolylines';


const MapWrapper = memo(({ children }: { children: React.ReactNode }) => {
    return (
        <MapContainer center={supplierLocation} zoom={12} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    );
});
MapWrapper.displayName = 'MapWrapper';


export default function LiveDispatchMap() {
    const [deliveries, setDeliveries] = useState(mockDeliveries);
    const [filter, setFilter] = useState('All');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDeliveries(prevDeliveries =>
                prevDeliveries.map(d => {
                    if (d.status === 'In-Transit') {
                        const personCoords = d.deliveryPerson.coords as number[];
                        const vendorCoords = d.vendor.coords as number[];
                        // Move marker slightly towards the destination
                        const newLat = personCoords[0] + (vendorCoords[0] - personCoords[0]) * 0.1;
                        const newLng = personCoords[1] + (vendorCoords[1] - personCoords[1]) * 0.1;

                        // Check if close to destination
                        const distance = Math.sqrt(Math.pow(vendorCoords[0] - newLat, 2) + Math.pow(vendorCoords[1] - newLng, 2));
                        if (distance < 0.005) {
                            return { ...d, status: 'Delivered', deliveryPerson: {...d.deliveryPerson, coords: d.vendor.coords} };
                        }
                        return { ...d, deliveryPerson: { ...d.deliveryPerson, coords: [newLat, newLng] as LatLngExpression }};
                    }
                    if (d.status === 'Awaiting Pickup') {
                         return { ...d, status: 'In-Transit' };
                    }
                    return d;
                }).filter(d => d.status !== 'Delivered')
            );
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const filteredDeliveries = useMemo(() =>
        deliveries.filter(d => filter === 'All' || d.status === filter),
        [deliveries, filter]
    );
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Dispatch Map</CardTitle>
                <CardDescription>Real-time tracking of all outgoing deliveries.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Awaiting Pickup">Awaiting Pickup</SelectItem>
                            <SelectItem value="In-Transit">In-Transit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="h-[500px] w-full rounded-md border">
                    {deliveries.length > 0 ? (
                        <MapWrapper>
                            <DeliveryMarkers deliveries={filteredDeliveries} />
                            <RoutePolylines deliveries={filteredDeliveries} />
                            <MapUpdater center={supplierLocation} deliveries={filteredDeliveries} />
                        </MapWrapper>
                    ) : (
                         <div className="h-full flex items-center justify-center bg-muted">
                            <Alert>
                                <AlertTitle>No Active Deliveries</AlertTitle>
                                <AlertDescription>There are no deliveries currently in progress.</AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
