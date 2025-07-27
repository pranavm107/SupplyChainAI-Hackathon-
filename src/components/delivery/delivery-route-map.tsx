
'use client';

import React, { useState, useEffect, useMemo, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Package, Phone, Pin, Warehouse } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// Mock Data
const deliveryRoute = {
  supplier: {
    name: 'Gupta Supplies',
    address: 'Kurla, Mumbai',
    coords: [19.0824, 72.8878] as LatLngExpression
  },
  vendors: [
    {
      orderId: 'ORD-201',
      name: 'Raju Chaat',
      address: 'Dadar, Mumbai',
      items: 'Onions (30kg)',
      coords: [19.0176, 72.8478] as LatLngExpression
    },
    {
      orderId: 'ORD-202',
      name: 'Sita Snacks',
      address: 'Bandra, Mumbai',
      items: 'Paneer (15kg)',
      coords: [19.0596, 72.8295] as LatLngExpression
    },
    {
      orderId: 'ORD-203',
      name: 'Mumbai Vada Pav',
      address: 'Andheri, Mumbai',
      items: 'Tomatoes (40kg)',
      coords: [19.1197, 72.8464] as LatLngExpression
    }
  ],
};

const routePath = [
  deliveryRoute.supplier.coords,
  ...deliveryRoute.vendors.map(v => v.coords)
];

const createIcon = (type: 'current' | 'supplier' | 'vendor') => new Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${type === 'current' ? 'blue' : type === 'supplier' ? 'violet' : 'green'}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const icons = {
  current: createIcon('current'),
  supplier: createIcon('supplier'),
  vendor: createIcon('vendor'),
};

const MapUpdater = ({ currentPos }: { currentPos: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(currentPos, 14, { animate: true, duration: 1 });
  }, [currentPos, map]);
  return null;
};

const MapContent = memo(() => {
  const [key, setKey] = useState(0);
  const [currentPos, setCurrentPos] = useState<LatLngExpression>(routePath[0]);
  const [currentSegment, setCurrentSegment] = useState(0);
  
  useEffect(() => {
      setKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const moveMarker = () => {
      if (currentSegment >= routePath.length - 1) return;

      const start = routePath[currentSegment] as [number, number];
      const end = routePath[currentSegment + 1] as [number, number];
      const current = currentPos as [number, number];

      const newLat = current[0] + (end[0] - start[0]) * 0.1;
      const newLng = current[1] + (end[1] - start[1]) * 0.1;

      const distanceToEnd = Math.sqrt(Math.pow(end[0] - newLat, 2) + Math.pow(end[1] - newLng, 2));

      if (distanceToEnd < 0.005) {
        setCurrentPos(end);
        setCurrentSegment(prev => prev + 1);
      } else {
        setCurrentPos([newLat, newLng]);
      }
    };

    const interval = setInterval(moveMarker, 2000);
    return () => clearInterval(interval);
  }, [currentPos, currentSegment]);

  return (
    <MapContainer key={key} center={currentPos} zoom={13} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Current Position Marker */}
      <Marker position={currentPos} icon={icons.current} zIndexOffset={1000}>
        <Popup>Your current location</Popup>
      </Marker>

      {/* Supplier Marker */}
      <Marker position={deliveryRoute.supplier.coords} icon={icons.supplier}>
        <Popup>
            <h3 className="font-bold flex items-center gap-2"><Warehouse className="h-4 w-4" />Pickup: {deliveryRoute.supplier.name}</h3>
            <p>{deliveryRoute.supplier.address}</p>
        </Popup>
      </Marker>
      
      {/* Vendor Markers */}
      {deliveryRoute.vendors.map((vendor, index) => (
        <Marker key={vendor.orderId} position={vendor.coords} icon={icons.vendor}>
            <Popup>
                <div className="space-y-2 w-48">
                    <h3 className="font-bold flex items-center gap-2"><Home className="h-4 w-4" />Drop-off #{index + 1}: {vendor.name}</h3>
                    <p className="text-xs"><strong>Order:</strong> {vendor.orderId}</p>
                    <p className="text-xs"><strong>Items:</strong> {vendor.items}</p>
                    <Badge variant={currentSegment > index + 1 ? 'default' : 'secondary'} className={currentSegment > index + 1 ? 'bg-green-500' : ''}>
                      {currentSegment > index + 1 ? 'Delivered' : 'Pending'}
                    </Badge>
                </div>
            </Popup>
        </Marker>
      ))}

      {/* Route Polyline */}
      <Polyline positions={routePath} color="blue" />
      <MapUpdater currentPos={currentPos} />
    </MapContainer>
  );
});
MapContent.displayName = 'MapContent';


export default function DeliveryRouteMap() {
    const mapComponent = useMemo(() => <MapContent />, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's Delivery Route</CardTitle>
                <CardDescription>Optimized route for your pickups and drop-offs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[600px] w-full rounded-md border">
                   {mapComponent}
                </div>
            </CardContent>
        </Card>
    );
}
