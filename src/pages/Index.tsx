import { useState } from 'react';
import { ArrowRight, Users, Bus, Shield, Zap, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PassengerApp } from '@/components/passenger/PassengerApp';
import { DriverApp } from '@/components/driver/DriverApp';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

type AppMode = 'home' | 'passenger' | 'driver' | 'admin';

// Mock user data for demonstration
const mockUsers = [
  { id: 1, email: 'p@test.com', password: '123', role: 'passenger' as const },
  { id: 2, email: 'd@test.com', password: '123', role: 'driver' as const },
  { id: 3, email: 'a@test.com', password: '123', role: 'admin' as const },
];

const Index = () => {
  const [currentApp, setCurrentApp] = useState<AppMode>('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple authentication logic
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentApp(user.role);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = (role: 'passenger' | 'driver' | 'admin') => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      setCurrentApp(role);
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-strong">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              RouteSync
            </h1>
            <p className="text-lg text-muted-foreground">
              Next-Gen Transit System
            </p>
          </header>

          {/* Login Form */}
          <Card className="p-6 shadow-strong">
            <h2 className="text-2xl font-bold text-center mb-6">Login to RouteSync</h2>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="text-destructive text-sm text-center">{error}</div>
                )}
                
                <Button type="submit" className="w-full bg-gradient-primary text-white">
                  Login
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-center mb-4">Quick Demo Access</h3>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-xs h-10"
                  onClick={() => handleDemoLogin('passenger')}
                >
                  Passenger
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-xs h-10"
                  onClick={() => handleDemoLogin('driver')}
                >
                  Driver
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-xs h-10"
                  onClick={() => handleDemoLogin('admin')}
                >
                  Admin
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;