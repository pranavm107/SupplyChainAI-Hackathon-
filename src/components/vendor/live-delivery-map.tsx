
'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bike, Phone, Truck, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import 'leaflet/dist/leaflet.css';

// Mock data for delivery persons
const mockDeliveryPersons = [
    {
        id: 'DP-01',
        name: 'Suresh Kumar',
        phone: '+91 98765 43210',
        vehicleType: 'Bike',
        status: 'Delivering',
        eta: '15 mins',
        currentAddress: 'Near Dadar Station, Mumbai',
        coords: [19.0176, 72.8478] as LatLngExpression,
        orderId: 'ORD-102'
    },
    {
        id: 'DP-02',
        name: 'Rina S.',
        phone: '+91 98765 43211',
        vehicleType: 'Van',
        status: 'Picking Up',
        eta: '10 mins to pickup',
        currentAddress: 'Andheri East, Mumbai',
        coords: [19.1136, 72.8697] as LatLngExpression,
        orderId: 'ORD-105'
    },
    {
        id: 'DP-03',
        name: 'Amit P.',
        phone: '+91 98765 43212',
        vehicleType: 'Bike',
        status: 'Idle',
        eta: 'N/A',
        currentAddress: 'Bandra West, Mumbai',
        coords: [19.0596, 72.8295] as LatLngExpression,
        orderId: null
    },
];

type DeliveryPerson = typeof mockDeliveryPersons[0];

const statusConfig: { [key: string]: { color: string; icon: string, markerColor: string } } = {
  Idle: { color: 'bg-gray-500', icon: '⚪', markerColor: 'grey' },
  'Picking Up': { color: 'bg-yellow-500', icon: '🟡', markerColor: 'yellow' },
  Delivering: { color: 'bg-blue-500', icon: '🔵', markerColor: 'blue' },
  Delivered: { color: 'bg-green-500', icon: '🟢', markerColor: 'green' },
};

const VehicleIcon = ({ type }: { type: string }) =>
  type === 'Bike' ? <Bike className="h-4 w-4" /> : <Truck className="h-4 w-4" />;

const createMarkerIcon = (status: string) => {
    const markerColor = statusConfig[status]?.markerColor || 'grey';
    return new Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const MapUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 13);
    }, [center, map]);
    return null;
};

// This component renders the markers and popups, and will be updated
const DeliveryMarkers = ({ persons }: { persons: DeliveryPerson[] }) => {
    return (
        <>
            {persons.map(person => (
                <Marker key={person.id} position={person.coords} icon={createMarkerIcon(person.status)}>
                    <Popup>
                        <div className="space-y-2">
                            <h3 className="font-bold text-base flex items-center gap-2"><User className="h-4 w-4" />{person.name}</h3>
                            <p className="flex items-center gap-2 text-sm"><VehicleIcon type={person.vehicleType} />{person.vehicleType}</p>
                            <p className="text-sm"><strong>Status:</strong> <Badge variant="default" className={statusConfig[person.status].color}>{person.status}</Badge></p>
                            <p className="text-sm"><strong>ETA:</strong> {person.eta}</p>
                            <p className="text-sm"><strong>Order:</strong> {person.orderId || 'N/A'}</p>
                            <Button size="sm" className="w-full flex items-center gap-2" asChild>
                                <a href={`tel:${person.phone}`}><Phone className="h-4 w-4" /> Contact</a>
                            </Button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

// The new MapContent component now only contains the map container and non-stateful layers
const MapContent = ({ children, center }: { children: React.ReactNode, center: LatLngExpression }) => {
    return (
        <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    );
};


export default function LiveDeliveryMap() {
    const [deliveryPersons, setDeliveryPersons] = useState(mockDeliveryPersons);
    const [filter, setFilter] = useState('All');
    const [mapCenter, setMapCenter] = useState<LatLngExpression>([19.0760, 72.8777]); // Default to Mumbai
    
    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setDeliveryPersons(prevPersons =>
                prevPersons.map(p => {
                    if (p.status === 'Delivering') {
                        return {
                            ...p,
                            coords: [
                                (p.coords as number[])[0] + (Math.random() - 0.5) * 0.001,
                                (p.coords as number[])[1] + (Math.random() - 0.5) * 0.001,
                            ] as LatLngExpression,
                        };
                    }
                    return p;
                })
            );
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const filteredPersons = useMemo(() => 
        deliveryPersons.filter(p => filter === 'All' || p.status === filter),
        [deliveryPersons, filter]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Delivery Tracking</CardTitle>
                <CardDescription>View the real-time location of delivery personnel for your active orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Delivering">Delivering</SelectItem>
                            <SelectItem value="Picking Up">Picking Up</SelectItem>
                            <SelectItem value="Idle">Idle</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex space-x-2 text-xs">
                        {Object.entries(statusConfig).map(([status, { icon }]) => (
                            <span key={status} className="flex items-center">{icon} {status}</span>
                        ))}
                    </div>
                </div>
                <div className="h-[500px] w-full rounded-md border">
                    {filteredPersons.length > 0 ? (
                        <MapContent center={mapCenter}>
                            <DeliveryMarkers persons={filteredPersons} />
                            <MapUpdater center={mapCenter} />
                        </MapContent>
                    ) : (
                         <div className="h-full flex items-center justify-center bg-muted">
                            <Alert>
                                <AlertTitle>No Active Deliveries</AlertTitle>
                                <AlertDescription>There are no delivery personnel to display for the selected filter.</AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
