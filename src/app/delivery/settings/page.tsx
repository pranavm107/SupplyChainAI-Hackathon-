import DeliverySettingsClient from '@/components/delivery/delivery-settings-client';

export default function DeliverySettingsPage() {
    const userProfile = {
        name: 'Suresh Kumar',
        phone: '+91 98765 43210',
        deliveryId: 'DEL-PERSON-58',
        profilePhotoUrl: 'https://placehold.co/128x128.png',
        language: 'en',
        notifications: {
            sms: true,
            whatsapp: true,
            push: false
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Settings</h2>
            </div>
            <DeliverySettingsClient userProfile={userProfile} />
        </div>
    );
}
