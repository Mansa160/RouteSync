import { User, Phone, Star, Calendar, MapPin, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ProfileSection() {
  const userStats = {
    totalTrips: 47,
    totalPoints: 865,
    memberSince: '2023-08-15',
    favoriteRoute: 'Route 42A'
  };

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <Card className="p-6 shadow-soft bg-gradient-card">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">John Commuter</h2>
            <div className="flex items-center space-x-1 text-muted-foreground mt-1">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <Badge variant="outline" className="mt-2 text-xs">
              Regular Commuter
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-success mb-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{userStats.totalPoints}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-primary mb-1">
              <MapPin className="h-4 w-4" />
              <span className="font-semibold">{userStats.totalTrips}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Trips</p>
          </div>
        </div>
      </Card>

      {/* Stats & Info */}
      <Card className="p-4 shadow-soft">
        <h3 className="font-semibold text-foreground mb-3">Account Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Member Since</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(userStats.memberSince).toLocaleDateString()}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Favorite Route</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {userStats.favoriteRoute}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-4 shadow-soft">
        <h3 className="font-semibold text-foreground mb-3">Account Actions</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-4 w-4 mr-3" />
            Edit Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Star className="h-4 w-4 mr-3" />
            Rewards History
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-3" />
            Trip History
          </Button>
          
          <Separator className="my-2" />
          
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}