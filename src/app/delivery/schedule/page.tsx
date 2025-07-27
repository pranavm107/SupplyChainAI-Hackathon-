import DeliveryScheduleClient from '@/components/delivery/delivery-schedule-client';

export default function DeliverySchedulePage() {
    const scheduledTasks = [
        { time: '10:00 AM', task: 'Pickup from Gupta Supplies', type: 'pickup' },
        { time: '11:30 AM', task: 'Drop-off at Raju Chaat', type: 'dropoff' },
        { time: '01:00 PM', task: 'Pickup from Masala House', type: 'pickup' },
        { time: '02:00 PM', task: 'Drop-off at Mumbai Vada Pav', type: 'dropoff' },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">My Schedule</h2>
            </div>
            <DeliveryScheduleClient scheduledTasks={scheduledTasks} />
        </div>
    );
}
