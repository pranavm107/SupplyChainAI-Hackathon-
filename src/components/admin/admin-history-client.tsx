'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/vendor/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HistoryLog {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
}

interface HistoryClientProps {
    historyLogs: HistoryLog[];
}

export default function AdminHistoryClient({ historyLogs }: HistoryClientProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>A complete log of all system activities and transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                    <DateRangePicker className="w-full sm:w-auto" />
                    <Input placeholder="Filter by user (Vendor/Supplier)..." className="w-full sm:w-auto flex-grow" />
                     <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by action type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="created">Created</SelectItem>
                            <SelectItem value="modified">Modified</SelectItem>
                            <SelectItem value="deleted">Deleted</SelectItem>
                             <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Apply Filters
                    </Button>
                     <Button className="w-full sm:w-auto ml-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Export to CSV
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Log ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.id}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.target}</TableCell>
                                    <TableCell>{log.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
