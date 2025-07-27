import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, ShoppingCart, User, Truck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary">SupplySmartAI</h1>
        <p className="text-muted-foreground text-lg sm:text-xl mt-2">Advanced Sourcing for Indian Street Food Vendors</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl">
        <DashboardLink
          href="/vendor/dashboard"
          title="Vendor"
          description="Manage your requests, track orders, and view AI-powered savings."
          icon={<ShoppingCart className="w-8 h-8 text-accent" />}
        />
        <DashboardLink
          href="/supplier/dashboard"
          title="Supplier"
          description="Respond to requests, provide quotes, and manage your deliveries."
          icon={<User className="w-8 h-8 text-accent" />}
        />
         <DashboardLink
          href="/delivery/dashboard"
          title="Delivery"
          description="Track assigned deliveries, update status, and view your schedule."
          icon={<Truck className="w-8 h-8 text-accent" />}
        />
        <DashboardLink
          href="/admin/dashboard"
          title="Admin"
          description="Oversee the platform, monitor analytics, and manage all users."
          icon={<Shield className="w-8 h-8 text-accent" />}
        />
      </div>
    </main>
  );
}

interface DashboardLinkProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function DashboardLink({ href, title, description, icon }: DashboardLinkProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col rounded-lg">
        <CardHeader className="flex flex-col items-center text-center p-6">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            {icon}
          </div>
          <CardTitle className="font-headline text-2xl text-primary-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow text-center px-6">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
