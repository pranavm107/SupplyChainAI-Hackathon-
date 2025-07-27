'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import { LanguageSwitcher } from "./language-switcher";
import { Package } from "lucide-react";

type UserType = "vendor" | "supplier" | "admin" | "delivery";

const navLinksConfig: Record<UserType, { href: string; label: string }[]> = {
  vendor: [
    { href: "/vendor/dashboard", label: "Dashboard" },
    { href: "/vendor/requests", label: "Request" },
    { href: "/vendor/suppliers", label: "Suppliers" },
    { href: "/vendor/orders", label: "Orders" },
    { href: "/vendor/history", label: "History" },
    { href: "/vendor/analytics", label: "Analytics" },
  ],
  supplier: [
    { href: "/supplier/dashboard", label: "Dashboard" },
    { href: "/supplier/requests", label: "Request" },
    { href: "/supplier/orders", label: "Orders" },
    { href: "/supplier/history", label: "History" },
    { href: "/supplier/analytics", label: "Analytics" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/requests", label: "Requests" },
    { href: "/admin/suppliers", label: "Suppliers" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/deliveries", label: "Deliveries" },
    { href: "/admin/personnel", label: "Personnel" },
    { href: "/admin/history", label: "History" },
    { href: "/admin/analytics", label: "Analytics" },
  ],
  delivery: [
    { href: "/delivery/dashboard", label: "Dashboard" },
    { href: "/delivery/status", label: "Status" },
    { href: "/delivery/schedule", label: "Schedule" },
    { href: "/delivery/earnings", label: "Earnings" },
    { href: "/delivery/support", label: "Support" },
     { href: "/delivery/settings", label: "Settings" },
  ]
};

export default function Navbar({ userType }: { userType: UserType }) {
  const pathname = usePathname();
  const navLinks = navLinksConfig[userType];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold font-headline">SupplySmartAI</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LanguageSwitcher />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
