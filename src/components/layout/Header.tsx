
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  FileText, 
  Activity, 
  Bell,
  Power,
  LogOut
} from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const { botStatus, toggleAutoTrading, autoTrading, logout } = useAppContext();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Logs', path: '/logs', icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/40 py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8 hover:opacity-80 transition-opacity">
            <Activity size={24} className="mr-2 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">TradeBolt</h1>
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-md flex items-center transition-all duration-200",
                    active 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <Icon size={16} className="mr-2" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="relative"
          >
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </Button>
          
          <Button 
            variant={autoTrading ? "default" : "outline"} 
            size="sm"
            className={cn(
              "transition-all duration-300",
              autoTrading ? "bg-success hover:bg-success/90 text-success-foreground" : "border-muted-foreground/30"
            )}
            onClick={toggleAutoTrading}
          >
            <Power size={16} className="mr-1.5" />
            {autoTrading ? "Active" : "Inactive"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
          >
            <LogOut size={16} className="mr-1.5" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
