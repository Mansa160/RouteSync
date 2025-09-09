import { Home, MapPin, Wallet, User, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQRScan: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'track', label: 'Track', icon: MapPin },
  { id: 'qr-placeholder', label: '', icon: QrCode, isQR: true },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ activeTab, onTabChange, onQRScan }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-card border-t border-border/50 backdrop-blur-md">
      <div className="flex items-center justify-around h-bottom-nav px-4 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          if (item.isQR) {
            return (
              <div key={item.id} className="relative">
                <Button
                  onClick={onQRScan}
                  className="w-14 h-14 rounded-full bg-gradient-qr text-white shadow-strong hover:scale-110 transition-bounce border-4 border-background"
                >
                  <QrCode className="h-6 w-6" />
                </Button>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs font-medium text-primary">Scan</span>
                </div>
              </div>
            );
          }

          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center space-y-1 h-auto py-2 px-3 transition-smooth hover:bg-accent',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}