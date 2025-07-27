import { adminAiAnalytics } from "@/ai/flows/admin-ai-analytics";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";
import type { AdminAiAnalyticsOutput } from "@/ai/flows/admin-ai-analytics";

export default async function AdminDashboardPage() {
    let analyticsData: AdminAiAnalyticsOutput;
    try {
        analyticsData = await adminAiAnalytics();
    } catch (error) {
        console.error("Failed to fetch admin analytics:", error);
        // Provide fallback data on error
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
