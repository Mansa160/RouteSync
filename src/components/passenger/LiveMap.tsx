import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Bus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BusLocation {
  id: string;
  routeName: string;
  location: { lat: number; lng: number };
  eta: number;
  status: 'approaching' | 'boarding' | 'departed';
}

export function LiveMap() {
  const [nearbyBuses, setNearbyBuses] = useState<BusLocation[]>([
    {
      id: 'bus-001',
      routeName: 'Route 42A',
      location: { lat: 12.9716, lng: 77.5946 },
      eta: 3,
      status: 'approaching'
    },
    {
      id: 'bus-002',
      routeName: 'Route 15B',
      location: { lat: 12.9726, lng: 77.5956 },
      eta: 8,
      status: 'boarding'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approaching': return 'bg-success';
      case 'boarding': return 'bg-warning';
      case 'departed': return 'bg-muted-foreground';
      default: return 'bg-primary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approaching': return 'Approaching';
      case 'boarding': return 'Boarding';
      case 'departed': return 'Departed';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="p-4 shadow-soft bg-gradient-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Live Bus Tracking</span>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
          <Navigation className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-accent/30 rounded-lg h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground mt-1">Powered by GPS tracking</p>
          </div>
        </div>
        
        {/* Mock bus markers */}
        <div className="absolute top-4 left-6">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-md"></div>
        </div>
        <div className="absolute bottom-6 right-8">
          <div className="w-3 h-3 bg-warning rounded-full animate-pulse shadow-md"></div>
        </div>
      </div>

      {/* Nearby Buses List */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground text-sm">Nearby Buses</h4>
        {nearbyBuses.map((bus) => (
          <div key={bus.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bus className="h-5 w-5 text-primary" />
                <div className={cn('absolute -top-1 -right-1 w-3 h-3 rounded-full', getStatusColor(bus.status))}></div>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{bus.routeName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    {getStatusText(bus.status)}
                  </Badge>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{bus.eta} min</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
              Track
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}