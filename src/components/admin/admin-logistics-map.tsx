'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bike, Phone, Truck, User, Warehouse, Home, MapPin, Package, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

const mockSuppliers = [
    { id: 'SUP-01', name: 'Gupta Supplies', coords: [19.0760, 72.8777] as LatLngExpression, city: 'Mumbai' },
    { id: 'SUP-02', name: 'Fresh Veggies Co', coords: [28.6139, 77.2090] as LatLngExpression, city: 'Delhi' },
];

const mockVendors = [
    { id: 'VEND-01', name: 'Raju Chaat', coords: [19.0176, 72.8478] as LatLngExpression, city: 'Mumbai' },
    { id: 'VEND-02', name: 'Sita Snacks', coords: [19.0596, 72.8295] as LatLngExpression, city: 'Mumbai' },
    { id: 'VEND-03', name: 'Kolkata Rolls', coords: [28.6517, 77.2219] as LatLngExpression, city: 'Delhi' },
];

const mockDeliveries = [
    {
        deliveryId: 'DEL-ADM-01', orderId: 'ORD-201',
        supplierId: 'SUP-01', vendorId: 'VEND-01',
        deliveryPerson: {
            id: 'DP-01', name: 'Suresh Kumar', phone: '+91 98765 43210',
            vehicleType: 'Bike', coords: [19.0476, 72.8528] as LatLngExpression,
        },
        status: 'In-Transit',
    },
    {
        deliveryId: 'DEL-ADM-02', orderId: 'ORD-204',
        supplierId: 'SUP-02', vendorId: 'VEND-03',
        deliveryPerson: {
            id: 'DP-03', name: 'Amit P.', phone: '+91 98765 43212',
            vehicleType: 'Van', coords: [28.6304, 77.2177] as LatLngExpression,
        },
        status: 'In-Transit',
    },
    {
        deliveryId: 'DEL-ADM-03', orderId: 'ORD-202',
        supplierId: 'SUP-01', vendorId: 'VEND-02',
        deliveryPerson: {
            id: 'DP-02', name: 'Rina S.', phone: '+91 98765 43211',
            vehicleType: 'Bike', coords: [19.0760, 72.8777] as LatLngExpression, // at supplier
        },
        status: 'Awaiting Pickup',
    }
];

type Delivery = typeof mockDeliveries[0];

const iconMap = {
    supplier: new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}),
    vendor: new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}),
    delivery_transit: new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}),
    delivery_pickup: new Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}),
};

const VehicleIcon = ({ type }: { type: string }) => type === 'Bike' ? <Bike className="h-4 w-4" /> : <Truck className="h-4 w-4" />;

const MapUpdater = ({ deliveries }: { deliveries: Delivery[] }) => {
    const map = useMap();
    useEffect(() => {
        if (deliveries.length > 0) {
            const bounds = deliveries.flatMap(d => {
                const supplier = mockSuppliers.find(s => s.id === d.supplierId);
                const vendor = mockVendors.find(v => v.id === d.vendorId);
                return [d.deliveryPerson.coords, supplier?.coords, vendor?.coords].filter(Boolean) as LatLngExpression[];
            });
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [deliveries, map]);
    return null;
};

const MapContent = React.memo(({ deliveries, filter }: { deliveries: Delivery[], filter: string }) => {
    const filteredDeliveries = useMemo(() =>
        deliveries.filter(d => filter === 'All' || d.deliveryPerson.id === filter),
        [deliveries, filter]
    );

    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {mockSuppliers.map(supplier => (
                <Marker key={supplier.id} position={supplier.coords} icon={iconMap.supplier}>
                    <Popup><Warehouse className="inline-block mr-2"/>Supplier: {supplier.name}</Popup>
                </Marker>
            ))}

            {mockVendors.map(vendor => (
                <Marker key={vendor.id} position={vendor.coords} icon={iconMap.vendor}>
                    <Popup><Home className="inline-block mr-2"/>Vendor: {vendor.name}</Popup>
                </Marker>
            ))}

            {filteredDeliveries.map(delivery => (
                <Marker key={delivery.deliveryId} position={delivery.deliveryPerson.coords} icon={delivery.status === 'In-Transit' ? iconMap.delivery_transit : iconMap.delivery_pickup}>
                    <Popup>
                        <div className="space-y-2 w-48">
                            <h3 className="font-bold">{delivery.deliveryPerson.name}</h3>
                            <p className="text-xs"><VehicleIcon type={delivery.deliveryPerson.vehicleType} /> {delivery.deliveryPerson.vehicleType}</p>
                            <Badge className={delivery.status === 'In-Transit' ? 'bg-blue-500' : 'bg-yellow-500'}>{delivery.status}</Badge>
                            <p className="text-xs"><strong>Order:</strong> {delivery.orderId}</p>
                            <p className="text-xs"><strong>From:</strong> {mockSuppliers.find(s=>s.id === delivery.supplierId)?.name}</p>
                            <p className="text-xs"><strong>To:</strong> {mockVendors.find(v=>v.id === delivery.vendorId)?.name}</p>
                            <Button size="sm" className="w-full" asChild><a href={`tel:${delivery.deliveryPerson.phone}`}><Phone className="mr-2 h-4 w-4"/>Contact</a></Button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {filteredDeliveries.map(delivery => {
                const supplier = mockSuppliers.find(s => s.id === delivery.supplierId);
                const vendor = mockVendors.find(v => v.id === delivery.vendorId);
                if (!supplier || !vendor) return null;
                return (
                    <g key={delivery.deliveryId}>
                        <Polyline positions={[supplier.coords, delivery.deliveryPerson.coords]} color="grey" dashArray="5,5" />
                        <Polyline positions={[delivery.deliveryPerson.coords, vendor.coords]} color={delivery.status === 'In-Transit' ? "blue" : "orange"} />
                    </g>
                )
            })}
            
            <MapUpdater deliveries={filteredDeliveries} />
        </MapContainer>
    );
});
MapContent.displayName = 'MapContent';

export default function AdminLogisticsMap() {
    const [deliveries, setDeliveries] = useState(mockDeliveries);
    const [filter, setFilter] = useState('All');
    
    useEffect(() => {
        // Simulate real-time updates for demo
        const interval = setInterval(() => {
            setDeliveries(prev => prev.map(d => {
                if (d.status === 'Awaiting Pickup') return { ...d, status: 'In-Transit' };
                if (d.status === 'In-Transit') {
                    const vendor = mockVendors.find(v => v.id === d.vendorId);
                    if (!vendor) return d;
                    const personCoords = d.deliveryPerson.coords as number[];
                    const vendorCoords = vendor.coords as number[];
                    return {
                        ...d,
                        deliveryPerson: {
                            ...d.deliveryPerson,
                            coords: [
                                personCoords[0] + (vendorCoords[0] - personCoords[0]) * 0.1,
                                personCoords[1] + (vendorCoords[1] - personCoords[1]) * 0.1,
                            ] as LatLngExpression
                        }
                    };
                }
                return d;
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const displayMap = useMemo(() => (
         <MapContent deliveries={deliveries} filter={filter} />
    ),[deliveries, filter]);

    const deliveryPersonnel = useMemo(() => {
        const uniquePersonnel = new Map();
        mockDeliveries.forEach(d => {
            uniquePersonnel.set(d.deliveryPerson.id, d.deliveryPerson);
        });
        return Array.from(uniquePersonnel.values());
    }, []);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Platform-Wide Logistics View</CardTitle>
                <CardDescription>Real-time tracking of all suppliers, vendors, and delivery personnel.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter by delivery person" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Delivery Personnel</SelectItem>
                            {deliveryPersonnel.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-violet-500" /> Supplier</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-green-500" /> Vendor</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-blue-500" /> In-Transit</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-yellow-500" /> Awaiting Pickup</span>
                    </div>
                </div>
                <div className="h-[600px] w-full rounded-md border">
                    {deliveries.length > 0 ? (
                        displayMap
                    ) : (
                         <div className="h-full flex items-center justify-center bg-muted">
                            <Alert>
                                <AlertTitle>No Active Deliveries</AlertTitle>
                                <AlertDescription>There are no deliveries to display.</AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
