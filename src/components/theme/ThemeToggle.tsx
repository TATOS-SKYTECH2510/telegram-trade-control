
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animationClass } from '@/utils/animations';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ThemeToggle = ({ 
  className, 
  variant = 'outline',
  size = 'icon'
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "transition-all duration-200",
        animationClass({ scale: true }),
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={16} className="transition-transform" />
      ) : (
        <Sun size={16} className="transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
