
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { animationClass, AnimationProps } from '@/utils/animations';
import { LucideIcon } from 'lucide-react';

interface StatCardProps extends AnimationProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  valueClassName,
  fadeIn,
  fadeInDelay,
  slideIn,
  scale,
  float,
  pulse,
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "p-6 card-transition", 
        animationClass({ fadeIn, fadeInDelay, slideIn, scale, float, pulse }),
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className={cn("text-2xl font-bold tracking-tight", valueClassName)}>
            {value}
          </h3>
          
          {trend && (
            <div 
              className={cn(
                "inline-flex items-center text-xs font-medium",
                trend.isPositive ? "text-profit" : "text-loss"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="p-2 rounded-full bg-secondary/50">
            <Icon size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
