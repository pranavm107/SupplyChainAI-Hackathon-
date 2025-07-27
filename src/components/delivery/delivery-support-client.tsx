'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Bot, Send } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
}

interface DeliverySupportClientProps {
    faqs: FaqItem[];
}

export default function DeliverySupportClient({ faqs }: DeliverySupportClientProps) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Find answers to common questions about the delivery process.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> AI Chat</CardTitle>
                        <CardDescription>Have a specific question? Ask our AI assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col h-[400px]">
                        <div className="flex-grow p-4 bg-muted rounded-lg overflow-y-auto">
                            {/* Chat messages would go here */}
                             <div className="text-sm text-center text-muted-foreground p-8">
                                I'm here to help you with routing, status updates, and more!
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Input placeholder="Type your question..." />
                            <Button><Send className="h-4 w-4" /></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
