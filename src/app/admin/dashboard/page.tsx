import { adminAiAnalytics } from "@/ai/flows/admin-ai-analytics";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";
import type { AdminAiAnalyticsOutput } from "@/ai/flows/admin-ai-analytics";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AdminDashboardPage() {
    return (
        <Suspense fallback={<AdminDashboardSkeleton />}>
            <AdminDashboardData />
        </Suspense>
    );
}

async function AdminDashboardData() {
    let analyticsData: AdminAiAnalyticsOutput;
    try {
        analyticsData = await adminAiAnalytics();
    } catch (error) {
        console.error("Failed to fetch admin analytics:", error);
        analyticsData = {
            topCostSavingRecommendations: [],
            languagesUsed: [],
            aiChatUsageStatistics: {
                totalChats: 0,
                averageChatLength: 0,
            },
        };
    }

    return <AdminDashboardClient initialData={analyticsData} />;
}


function AdminDashboardSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-9 w-1/4" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24" />)}
            </div>
             <Skeleton className="h-40 w-full" />
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="lg:col-span-2 h-96" />
                <Skeleton className="h-96" />
            </div>
        </div>
    )
}
