import { Clock, MapPin, Star, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Trip {
  id: string;
  route: string;
  date: string;
  points: number;
  duration: string;
  status: 'completed' | 'cancelled' | 'ongoing';
  startLocation: string;
  endLocation: string;
}

export function TripHistory() {
  const trips: Trip[] = [
    {
      id: '1',
      route: 'Route 42A',
      date: '2024-01-15',
      points: 15,
      duration: '25 min',
      status: 'completed',
      startLocation: 'Electronic City',
      endLocation: 'Silk Board'
    },
    {
      id: '2',
      route: 'Route 15B',
      date: '2024-01-14',
      points: 12,
      duration: '18 min',
      status: 'completed',
      startLocation: 'Bannerghatta',
      endLocation: 'BTM Layout'
    },
    {
      id: '3',
      route: 'Route 28C',
      date: '2024-01-13',
      points: 0,
      duration: '0 min',
      status: 'cancelled',
      startLocation: 'Jayanagar',
      endLocation: 'Not completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'ongoing': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4 shadow-soft bg-gradient-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Recent Trips</span>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-background rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {trip.route}
                </Badge>
                <Badge className={getStatusColor(trip.status)}>
                  {trip.status}
                </Badge>
              </div>
              {trip.status === 'completed' && (
                <div className="flex items-center space-x-1 text-success">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-medium">+{trip.points} pts</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-success mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{trip.startLocation}</p>
                  <div className="w-px h-4 bg-border ml-2 my-1"></div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-destructive" />
                    <p className="text-sm text-muted-foreground">{trip.endLocation}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(trip.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{trip.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}