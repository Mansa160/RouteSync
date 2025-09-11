import { useState, useEffect } from 'react';
import { Bus, Navigation, QrCode, Clock, MapPin, User, LogIn } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function DriverApp() {
  const [isOnline, setIsOnline] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState<Date | null>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const busInfo = {
    busID: 'KA-01-AB-1234',
    routeID: 'Route 42A',
    routeName: 'Electronic City ↔ Silk Board'
  };

  const qrCodes = {
    boarding: 'BOARD_42A_001',
    exit: 'EXIT_42A_001'
  };

  const handleLogin = () => {
    // Simulate login process
    setIsLoggedIn(true);
    setUserName('Rajesh Kumar');
  };

  const handleLogout = () => {
    // Simulate logout process
    setIsLoggedIn(false);
    setUserName('');
    if (isOnline) {
      setIsOnline(false);
      setShiftStartTime(null);
    }
  };

  const toggleShift = () => {
    if (isOnline) {
      setIsOnline(false);
      setShiftStartTime(null);
    } else {
      setIsOnline(true);
      setShiftStartTime(new Date());
      startGPSSharing();
    }
  };

  const startGPSSharing = () => {
    // Simulate GPS sharing every 15 seconds
    const gpsInterval = setInterval(() => {
      if (!isOnline) {
        clearInterval(gpsInterval);
        return;
      }
      
      // Simulate location change
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      
      // Here you would send location to PocketBase
      console.log('Sending GPS location to PocketBase:', currentLocation);
    }, 15000);

    return () => clearInterval(gpsInterval);
  };

  const formatDuration = (startTime: Date | null) => {
    if (!startTime) return '00:00:00';
    
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [shiftDuration, setShiftDuration] = useState('00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      setShiftDuration(formatDuration(shiftStartTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [shiftStartTime]);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header with Login/Profile */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Bus className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-xl font-bold text-foreground">Driver Portal</h1>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Hello, {userName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <User className="h-4 w-4 mr-1" />
              Profile
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>
            <LogIn className="h-4 w-4 mr-1" />
            Login
          </Button>
        )}
      </div>

      {/* Bus Info Card */}
      <Card className="p-6 shadow-soft bg-gradient-card mb-4">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <Bus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{busInfo.busID}</h1>
          <p className="text-sm text-muted-foreground mt-1">{busInfo.routeName}</p>
          <Badge 
            variant={isOnline ? "default" : "secondary"} 
            className={`mt-2 ${isOnline ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>

        {isOnline && (
          <div className="bg-accent/20 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 text-primary mb-1">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{shiftDuration}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shift Duration</p>
          </div>
        )}
      </Card>

      {/* Shift Controls */}
      <Card className="p-6 shadow-soft mb-4">
        <h2 className="font-semibold text-foreground mb-4 flex items-center">
          <Navigation className="h-5 w-5 mr-2 text-primary" />
          Shift Management
        </h2>
        
        <Button 
          onClick={toggleShift}
          disabled={!isLoggedIn}
          className={`w-full h-12 text-lg font-semibold transition-smooth ${
            isOnline 
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
              : 'bg-gradient-primary text-white hover:scale-105'
          } ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isOnline ? 'End Shift' : 'Start Shift'}
        </Button>

        {!isLoggedIn && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Please login to start your shift
          </p>
        )}

        {isOnline && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-success mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">GPS Sharing Active</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Updates every 15 seconds
            </p>
          </div>
        )}
      </Card>

      {/* QR Codes */}
      <Card className="p-6 shadow-soft">
        <h2 className="font-semibold text-foreground mb-4 flex items-center">
          <QrCode className="h-5 w-5 mr-2 text-primary" />
          QR Codes for Passengers
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Boarding QR */}
          <div className="text-center">
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50 mb-3">
              <div className="w-32 h-32 bg-success/20 border-2 border-dashed border-success rounded-lg flex items-center justify-center mx-auto mb-2">
                <QrCode className="h-12 w-12 text-success" />
              </div>
              <p className="text-xs font-mono text-muted-foreground">{qrCodes.boarding}</p>
            </div>
            <Badge className="bg-success text-success-foreground">Boarding QR</Badge>
            <p className="text-xs text-muted-foreground mt-1">Passengers scan to start trip</p>
          </div>

          {/* Exit QR */}
          <div className="text-center">
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50 mb-3">
              <div className="w-32 h-32 bg-destructive/20 border-2 border-dashed border-destructive rounded-lg flex items-center justify-center mx-auto mb-2">
                <QrCode className="h-12 w-12 text-destructive" />
              </div>
              <p className="text-xs font-mono text-muted-foreground">{qrCodes.exit}</p>
            </div>
            <Badge className="bg-destructive text-destructive-foreground">Exit QR</Badge>
            <p className="text-xs text-muted-foreground mt-1">Passengers scan to end trip</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Display these QR codes prominently in your bus
          </p>
          <Button variant="outline" size="sm" className="text-primary" disabled={!isLoggedIn}>
            <QrCode className="h-4 w-4 mr-2" />
            Generate New QR Codes
          </Button>
        </div>
      </Card>

      {/* Footer Status */}
      <div className="fixed bottom-4 left-4 right-4">
        <div className={`text-center p-2 rounded-lg ${
          isOnline 
            ? 'bg-success/20 border border-success/30' 
            : 'bg-muted/20 border border-muted/30'
        }`}>
          <p className={`text-sm font-medium ${
            isOnline ? 'text-success' : 'text-muted-foreground'
          }`}>
            Status: {isOnline ? 'Online & Sharing GPS' : 'Offline'}
            {!isLoggedIn && ' - Please login'}
          </p>
        </div>
      </div>
    </div>
  );
}