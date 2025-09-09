import { useState } from 'react';
import { ArrowRight, Users, Bus, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PassengerApp } from '@/components/passenger/PassengerApp';
import { DriverApp } from '@/components/driver/DriverApp';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

type AppMode = 'home' | 'passenger' | 'driver' | 'admin';

const Index = () => {
  const [currentApp, setCurrentApp] = useState<AppMode>('home');

  if (currentApp === 'passenger') {
    return (
      <ThemeProvider defaultTheme="light">
        <PassengerApp />
      </ThemeProvider>
    );
  }

  if (currentApp === 'driver') {
    return (
      <ThemeProvider defaultTheme="light">
        <DriverApp />
      </ThemeProvider>
    );
  }

  if (currentApp === 'admin') {
    return (
      <ThemeProvider defaultTheme="light">
        <AdminDashboard />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16 text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              CommuterPro
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Smart Transit Platform
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing public transportation with QR-based rewards, 
              real-time tracking, and seamless mobile experiences
            </p>
          </div>
        </header>

        {/* App Selection Cards */}
        <main className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Passenger App Card */}
            <Card className="group p-8 shadow-medium hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30">
              <div 
                onClick={() => setCurrentApp('passenger')}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-smooth">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Passenger App</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan QR codes, track buses, earn rewards, and manage your wallet
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                      <span>QR Journey Tracking</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Live Bus Tracking</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                      <span>Rewards Wallet</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary text-white group-hover:scale-105 transition-bounce"
                >
                  Launch Passenger App
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Driver App Card */}
            <Card className="group p-8 shadow-medium hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30">
              <div 
                onClick={() => setCurrentApp('driver')}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-success/30 transition-smooth">
                  <Bus className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Driver App</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage shifts, share GPS location, and display QR codes for passengers
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                      <span>Shift Management</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>GPS Sharing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                      <span>QR Code Display</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white group-hover:scale-105 transition-bounce"
                >
                  Launch Driver App
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Admin Dashboard Card */}
            <Card className="group p-8 shadow-medium hover:shadow-strong transition-smooth cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30">
              <div 
                onClick={() => setCurrentApp('admin')}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-warning/30 transition-smooth">
                  <Shield className="h-8 w-8 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Admin Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage buses, drivers, routes, users, and view comprehensive analytics
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Fleet Management</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                      <span>User Analytics</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                      <span>System Settings</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-warning hover:bg-warning/90 text-white group-hover:scale-105 transition-bounce"
                >
                  Launch Admin Panel
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">QR Integration</h4>
                <p className="text-xs text-muted-foreground">Seamless boarding and exit with QR code scanning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Real-time Tracking</h4>
                <p className="text-xs text-muted-foreground">Live GPS tracking for accurate bus locations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bus className="h-6 w-6 text-warning" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Rewards System</h4>
                <p className="text-xs text-muted-foreground">Earn points for trips and redeem for discounts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-destructive" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Admin Control</h4>
                <p className="text-xs text-muted-foreground">Comprehensive management and analytics</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Info */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto p-6 shadow-soft bg-gradient-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-primary">React + Vite</p>
                  <p className="text-xs text-muted-foreground">Frontend</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">PocketBase</p>
                  <p className="text-xs text-muted-foreground">Backend</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">Capacitor</p>
                  <p className="text-xs text-muted-foreground">Mobile</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">Tailwind CSS</p>
                  <p className="text-xs text-muted-foreground">Styling</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
