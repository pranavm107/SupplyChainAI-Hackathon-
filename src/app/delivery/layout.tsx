import Navbar from "@/components/layout/navbar";
import AiAssistant from "@/components/ai/ai-assistant";

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar userType="delivery" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      <AiAssistant />
    </div>
  );
}
