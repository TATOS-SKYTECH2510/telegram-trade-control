
import React from 'react';
import { cn } from '@/lib/utils';
import { animationClass } from '@/utils/animations';
import { useTheme } from '@/context/ThemeContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto w-full",
        "transition-colors duration-300 ease-in-out",
        theme === 'dark' && "dark-gradient",
        animationClass({ fadeIn: true }),
        className
      )}
    >
      <main className="w-full space-y-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
