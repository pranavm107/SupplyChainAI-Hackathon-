import DeliveryStatusClient from '@/components/delivery/delivery-status-client';

export default function DeliveryStatusPage() {
    const deliveries = [
        { id: 'DEL-001', vendor: 'Raju Chaat', status: 'Ongoing' },
        { id: 'DEL-002', vendor: 'Sita Snacks', status: 'Pending' },
        { id: 'DEL-003', vendor: 'Mumbai Vada Pav', status: 'Delivered' },
        { id: 'DEL-004', vendor: 'Kolkata Rolls', status: 'Cancelled' },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Update Delivery Status</h2>
            </div>
            <DeliveryStatusClient deliveries={deliveries} />
        </div>
    )
}
