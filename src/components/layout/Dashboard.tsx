
import React from 'react';
import { cn } from '@/lib/utils';
import { animationClass } from '@/utils/animations';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  return (
    <div 
      className={cn(
        "min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto w-full",
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
