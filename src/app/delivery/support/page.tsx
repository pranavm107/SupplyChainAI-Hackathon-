import DeliverySupportClient from "@/components/delivery/delivery-support-client";

const faqData = [
  {
    question: "How do I mark a delivery as complete?",
    answer: "On the 'My Deliveries' page, find the specific order and tap the 'Mark as Delivered' button. You may be asked to provide proof of delivery.",
  },
  {
    question: "What if I cannot find the vendor's location?",
    answer: "You can use the map view on the delivery details page for navigation. If you are still unable to find the location, please use the AI assistant to contact support.",
  },
  {
    question: "How are my earnings calculated?",
    answer: "Your earnings are calculated based on the number of successful deliveries you complete. You can view a detailed breakdown on the 'Earnings' page.",
  },
   {
    question: "Can I change my availability?",
    answer: "Yes, you can set your available working hours and mark days off in the 'Schedule' page.",
  },
];

export default function DeliverySupportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Live Support</h2>
      </div>
      <DeliverySupportClient faqs={faqData} />
    </div>
  )
}
