import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

export function PassengerHeader() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-header bg-gradient-card border-b border-border/50 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">RouteSync</h1>
            <p className="text-xs text-muted-foreground">Next-Gen Transit</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 hover:bg-accent transition-smooth"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-primary" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
    </header>
  );
}