import { useState, useEffect } from 'react';
import { X, QrCode, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QRScannerProps {
  onClose: () => void;
}

export function QRScanner({ onClose }: QRScannerProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'boarding' | 'exit' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate QR scanning
  const simulateScan = (type: 'boarding' | 'exit') => {
    setIsProcessing(true);
    setScanType(type);
    
    setTimeout(() => {
      setScanResult(type === 'boarding' ? 'BOARD_42A_001' : 'EXIT_42A_001');
      setIsProcessing(false);
    }, 1500);
  };

  const resetScan = () => {
    setScanResult(null);
    setScanType(null);
    setIsProcessing(false);
  };

  if (scanResult) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-sm p-6 text-center shadow-strong">
            <div className="mb-4">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground">
                {scanType === 'boarding' ? 'Boarding Confirmed!' : 'Trip Completed!'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {scanType === 'boarding' 
                  ? 'Your journey has started. Scan exit QR to earn points.' 
                  : 'Journey completed successfully!'
                }
              </p>
            </div>

            {scanType === 'boarding' && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 text-warning">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">15 Points Pending</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete your journey to earn these points
                </p>
              </div>
            )}

            {scanType === 'exit' && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">+15 Points Earned!</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Points have been added to your wallet
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={resetScan}
                className="flex-1"
              >
                Scan Again
              </Button>
              <Button 
                onClick={onClose}
                className="flex-1 bg-gradient-primary text-white"
              >
                Done
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">QR Scanner</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            {isProcessing ? (
              <div className="mb-6">
                <div className="w-64 h-64 bg-gradient-card border-2 border-dashed border-primary rounded-2xl flex items-center justify-center mb-4 animate-pulse">
                  <QrCode className="h-16 w-16 text-primary animate-spin" />
                </div>
                <p className="text-foreground font-medium">Processing QR Code...</p>
                <p className="text-sm text-muted-foreground mt-1">Please wait</p>
              </div>
            ) : (
              <div className="mb-6">
                <div className="w-64 h-64 bg-gradient-card border-2 border-dashed border-primary rounded-2xl flex items-center justify-center mb-4">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
                <p className="text-foreground font-medium">Position QR Code in Frame</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan boarding QR to start trip or exit QR to complete
                </p>
              </div>
            )}

            {/* Demo buttons for testing */}
            <div className="space-y-3">
              <Button 
                onClick={() => simulateScan('boarding')}
                disabled={isProcessing}
                className="w-full bg-gradient-primary text-white"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Demo: Scan Boarding QR
              </Button>
              <Button 
                onClick={() => simulateScan('exit')}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Demo: Scan Exit QR
              </Button>
            </div>

            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs text-muted-foreground">Boarding</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-xs text-muted-foreground">Exit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}