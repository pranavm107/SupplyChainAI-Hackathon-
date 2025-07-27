'use client';

import { useState } from 'react';
import { BarChart, Briefcase, IndianRupee, Percent, Sparkles, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { StatCard } from '@/components/shared/stat-card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getCostOptimizationSuggestions } from '@/ai/flows/cost-optimization-suggestions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface VendorDashboardClientProps {
  vendor: {
    name: string;
  };
}

const demoSteps = [
    { title: "Create Request", description: "Submit your raw material needs.", data_ai_hint: "form checklist" },
    { title: "AI Analyzes", description: "Our AI finds the best prices and suppliers.", data_ai_hint: "brain circuit" },
    { title: "Get Recommendations", description: "Receive optimized suggestions in minutes.", data_ai_hint: "idea lightbulb" },
    { title: "Approve & Order", description: "Confirm your order with one click.", data_ai_hint: "approval checkmark" },
    { title: "Track Delivery", description: "Monitor your order status in real-time.", data_ai_hint: "delivery truck" },
    { title: "Save Big", description: "Enjoy lower costs and better quality.", data_ai_hint: "money savings" },
]

const recentRequests = [
    { id: "REQ-001", material: "Potatoes", date: "2023-10-26", status: "Fulfilled" },
    { id: "REQ-002", material: "Onions", date: "2023-10-25", status: "Pending" },
    { id: "REQ-003", material: "Cooking Oil", date: "2023-10-24", status: "Fulfilled" },
    { id: "REQ-004", material: "Spices Mix", date: "2023-10-23", status: "Cancelled" },
]

export default function VendorDashboardClient({ vendor }: VendorDashboardClientProps) {
  const [costRequest, setCostRequest] = useState('');
  const [costSuggestion, setCostSuggestion] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
      if (!costRequest.trim()) {
          toast({ variant: 'destructive', title: 'Error', description: 'Please enter request details.' });
          return;
      }
      setIsLoading(true);
      setCostSuggestion('');
      try {
          const result = await getCostOptimizationSuggestions({
              requestDetails: costRequest,
              vendorLocation: "Mumbai", // Example location
          });
          setCostSuggestion(result.suggestions);
      } catch (error) {
          console.error(error);
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to get suggestions.' });
      } finally {
          setIsLoading(false);
      }
  }
  
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Welcome back, {vendor.name}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Orders" value="5" icon={<Briefcase className="h-5 w-5 text-muted-foreground" />} description="2 more than last week" />
        <StatCard title="Trusted Suppliers" value="12" icon={<Sparkles className="h-5 w-5 text-muted-foreground" />} description="+3 this month" />
        <StatCard title="Total Spend" value={formatCurrency(15230)} icon={<IndianRupee className="h-5 w-5 text-muted-foreground" />} description="Month-to-date" />
        <StatCard title="Average Savings" value="12.5%" icon={<Percent className="h-5 w-5 text-muted-foreground" />} description="AI-powered savings" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Demo Walkthrough</CardTitle>
            <CardDescription>See how SupplySmartAI streamlines your procurement process.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {demoSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                       <Image src={`https://placehold.co/48x48.png`} alt={step.title} width={48} height={48} data-ai-hint={step.data_ai_hint} className="rounded-full" />
                    </div>
                    <p className="text-xs font-semibold">{index+1}. {step.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Usage Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Today's Usage</span>
                <span className="text-sm text-muted-foreground">3 / 10 credits</span>
              </div>
              <Progress value={30} />
            </div>
            <div>
              <p className="text-sm">Current Cost: <span className="font-semibold">{formatCurrency(15230)}</span></p>
              <p className="text-sm text-muted-foreground">Estimated Monthly Cost: <span className="font-semibold">{formatCurrency(25000)}</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>Your latest procurement requests and their statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentRequests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.id}</TableCell>
                            <TableCell>{req.material}</TableCell>
                            <TableCell>{req.date}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    req.status === 'Fulfilled' ? 'default' : 
                                    req.status === 'Pending' ? 'secondary' : 'destructive'
                                } className={
                                    req.status === 'Fulfilled' ? 'bg-green-600' : 
                                    req.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                }>{req.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cost Optimization Tips</CardTitle>
            <CardDescription>Enter your request details to get AI-powered savings suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="e.g., '10kg best quality potatoes, 5kg onions'"
              value={costRequest}
              onChange={(e) => setCostRequest(e.target.value)}
            />
            <Button onClick={handleGetSuggestions} disabled={isloading} className="w-full">
                {isloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Get Suggestions
            </Button>
            {costSuggestion && (
                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                    <h4 className="font-semibold text-foreground mb-2">AI Suggestion:</h4>
                    <p>{costSuggestion}</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
