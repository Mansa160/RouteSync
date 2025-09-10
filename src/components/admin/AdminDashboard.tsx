import { useState } from 'react';
import { 
  Users, 
  Bus, 
  MapPin, 
  Star, 
  BarChart3, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalUsers: 123,
    activeBuses: 23,
    todayTrips: 342,
    totalRewards: 15680
  };

  const buses = [
    { id: 'KA-01-AB-1234', route: '42A', driver: 'John Doe', status: 'online', passengers: 12 },
    { id: 'KA-01-AB-5678', route: '15B', driver: 'Jane Smith', status: 'offline', passengers: 0 },
    { id: 'KA-01-AB-9012', route: '28C', driver: 'Bob Wilson', status: 'online', passengers: 8 }
  ];

  const drivers = [
    { id: 'D001', name: 'John Doe', phone: '+91 98765 43210', busId: 'KA-01-AB-1234', status: 'online' },
    { id: 'D002', name: 'Jane Smith', phone: '+91 98765 43211', busId: 'KA-01-AB-5678', status: 'offline' },
    { id: 'D003', name: 'Bob Wilson', phone: '+91 98765 43212', busId: 'KA-01-AB-9012', status: 'online' }
  ];

  const users = [
    { id: 'U001', name: 'Alice Johnson', phone: '+91 98765 43213', points: 250, trips: 15 },
    { id: 'U002', name: 'Charlie Brown', phone: '+91 98765 43214', points: 180, trips: 12 },
    { id: 'U003', name: 'Diana Prince', phone: '+91 98765 43215', points: 320, trips: 20 }
  ];

  const getStatusBadge = (status: string) => (
    <Badge className={
      status === 'online' 
        ? 'bg-success text-success-foreground' 
        : 'bg-muted text-muted-foreground'
    }>
      {status}
    </Badge>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">CommuterPro Admin</h1>
        <p className="text-muted-foreground">Manage your transit system efficiently</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 shadow-soft bg-gradient-card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft bg-gradient-card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <Bus className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.activeBuses}</p>
              <p className="text-sm text-muted-foreground">Active Buses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft bg-gradient-card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.todayTrips}</p>
              <p className="text-sm text-muted-foreground">Today's Trips</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft bg-gradient-card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalRewards}</p>
              <p className="text-sm text-muted-foreground">Rewards Issued</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="buses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="buses">Buses</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Buses Tab */}
        <TabsContent value="buses">
          <Card className="shadow-soft">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Bus Management</h2>
                <Button className="bg-gradient-primary text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bus
                </Button>
              </div>
              <Input 
                placeholder="Search buses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Bus ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Passengers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {buses.map((bus) => (
                    <tr key={bus.id} className="hover:bg-accent/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{bus.id}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Route {bus.route}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{bus.driver}</td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(bus.status)}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{bus.passengers}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers">
          <Card className="shadow-soft">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Driver Management</h2>
                <Button className="bg-gradient-primary text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Driver
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned Bus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-accent/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{driver.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{driver.phone}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{driver.busId}</td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(driver.status)}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="shadow-soft">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">User Management</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Trips</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-accent/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-1 text-success">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{user.points}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.trips}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Usage Analytics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Daily Active Users</span>
                  <span className="font-semibold text-foreground">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Trip Duration</span>
                  <span className="font-semibold text-foreground">23 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Points Redeemed Today</span>
                  <span className="font-semibold text-foreground">1,245</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular Routes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">Route 42A</span>
                  <Badge variant="secondary">156 trips</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">Route 15B</span>
                  <Badge variant="secondary">134 trips</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">Route 28C</span>
                  <Badge variant="secondary">98 trips</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              System Settings
            </h2>
            <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}