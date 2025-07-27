import RequestClient from '@/components/vendor/request-client';

export default function VendorRequestsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Requests</h2>
      </div>
      <RequestClient />
    </div>
  )
}
