'use client';

import { Map } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="h-full w-full bg-muted flex flex-col items-center justify-center text-center p-4">
        <Map className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg text-muted-foreground">Map Not Available</h3>
        <p className="text-sm text-muted-foreground">
            The interactive map is temporarily disabled in this environment.
        </p>
         <p className="text-xs text-muted-foreground mt-2">
            It will be fully functional in the production application.
        </p>
    </div>
  );
}
