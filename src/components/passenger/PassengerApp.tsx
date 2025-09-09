import { useState } from 'react';
import { PassengerHeader } from './Header';
import { WalletCard } from './WalletCard';
import { LiveMap } from './LiveMap';
import { TripHistory } from './TripHistory';
import { BottomNav } from './BottomNav';
import { QRScanner } from './QRScanner';
import { ProfileSection } from './ProfileSection';

export function PassengerApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleQRScan = () => {
    setShowQRScanner(true);
  };

  const handleQRClose = () => {
    setShowQRScanner(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'track':
        return (
          <div className="p-4 space-y-4">
            <LiveMap />
          </div>
        );
      case 'wallet':
        return (
          <div className="p-4 space-y-4">
            <WalletCard points={250} pendingPoints={15} />
            <TripHistory />
          </div>
        );
      case 'profile':
        return (
          <div className="p-4">
            <ProfileSection />
          </div>
        );
      default:
        return (
          <div className="p-4 space-y-4">
            <WalletCard points={250} pendingPoints={15} />
            <LiveMap />
            <TripHistory />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PassengerHeader />
      
      <main className="pt-header pb-bottom-nav overflow-y-auto">
        {renderContent()}
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onQRScan={handleQRScan}
      />

      {showQRScanner && (
        <QRScanner onClose={handleQRClose} />
      )}
    </div>
  );
}