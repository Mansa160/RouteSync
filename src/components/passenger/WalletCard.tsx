import { Wallet, Star, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WalletCardProps {
  points: number;
  pendingPoints: number;
}

export function WalletCard({ points = 250, pendingPoints = 15 }: WalletCardProps) {
  return (
    <Card className="bg-gradient-primary p-6 shadow-medium border-0 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span className="font-medium">Rewards Wallet</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 px-3">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          Details
        </Button>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm opacity-90">Available Points</span>
          </div>
          <p className="text-2xl font-bold">{points.toLocaleString()}</p>
        </div>
        
        {pendingPoints > 0 && (
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-90">Pending Points</span>
              <span className="font-semibold">+{pendingPoints}</span>
            </div>
            <p className="text-xs opacity-75 mt-1">Complete your journey to earn</p>
          </div>
        )}
      </div>
    </Card>
  );
}