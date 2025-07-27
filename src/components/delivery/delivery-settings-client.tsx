'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UserProfile {
    name: string;
    phone: string;
    deliveryId: string;
    profilePhotoUrl: string;
    language: string;
    notifications: {
        sms: boolean;
        whatsapp: boolean;
        push: boolean;
    };
}

interface DeliverySettingsClientProps {
    userProfile: UserProfile;
}

export default function DeliverySettingsClient({ userProfile }: DeliverySettingsClientProps) {
    const [profile, setProfile] = useState(userProfile);

    const handleNotificationChange = (key: 'sms' | 'whatsapp' | 'push', value: boolean) => {
        setProfile(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value,
            }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Update your personal information and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                           <AvatarImage src={profile.profilePhotoUrl} alt={profile.name} data-ai-hint="person portrait" />
                           <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-2">
                             <Label htmlFor="picture">Profile Photo</Label>
                            <Input id="picture" type="file" />
                            <p className="text-xs text-muted-foreground">Upload a new photo. JPG, PNG, GIF up to 5MB.</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="delivery-id">Delivery ID</Label>
                            <Input id="delivery-id" value={profile.deliveryId} readOnly disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="language">Preferred Language</Label>
                            <Select value={profile.language} onValueChange={lang => setProfile({...profile, language: lang})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                    <SelectItem value="ta">Tamil</SelectItem>
                                    <SelectItem value="te">Telugu</SelectItem>
                                    <SelectItem value="kn">Kannada</SelectItem>
                                    <SelectItem value="mr">Marathi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                                <Switch id="sms-notifications" checked={profile.notifications.sms} onCheckedChange={(val) => handleNotificationChange('sms', val)} />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="whatsapp-notifications">WhatsApp Notifications</Label>
                                <Switch id="whatsapp-notifications" checked={profile.notifications.whatsapp} onCheckedChange={(val) => handleNotificationChange('whatsapp', val)} />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                                <Switch id="push-notifications" checked={profile.notifications.push} onCheckedChange={(val) => handleNotificationChange('push', val)} />
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
