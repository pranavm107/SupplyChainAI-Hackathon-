'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Truck, MapPin } from "lucide-react";
import React from "react";

interface Task {
    time: string;
    task: string;
    type: 'pickup' | 'dropoff';
}

interface DeliveryScheduleClientProps {
    scheduledTasks: Task[];
}

export default function DeliveryScheduleClient({ scheduledTasks }: DeliveryScheduleClientProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isAvailable, setIsAvailable] = React.useState(true);

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Set Availability</CardTitle>
                        <CardDescription>Mark your working days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            />
                        <div className="flex items-center space-x-2 mt-4 p-4 border rounded-lg">
                            <Switch id="availability-mode" checked={isAvailable} onCheckedChange={setIsAvailable} />
                            <Label htmlFor="availability-mode">{isAvailable ? "I'm available today" : "I'm unavailable today"}</Label>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>
                            {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {scheduledTasks.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="text-sm font-medium text-muted-foreground w-20">{item.time}</div>
                                    <div className="flex-shrink-0">
                                        {item.type === 'pickup' ? 
                                            <Truck className="h-5 w-5 text-blue-500" /> : 
                                            <MapPin className="h-5 w-5 text-green-500" />
                                        }
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.task}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Details</Button>
                                </div>
                            ))}
                             {scheduledTasks.length === 0 && (
                                <p className="text-muted-foreground text-center py-8">No tasks scheduled for today.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
