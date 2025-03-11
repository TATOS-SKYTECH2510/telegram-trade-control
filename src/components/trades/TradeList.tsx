import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

type TradeSignal = {
  id: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  timestamp: Date;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'COMPLETED';
  profit?: number;
};

interface TradeListProps {
  trades: TradeSignal[];
  title: string;
  className?: string;
  emptyMessage?: string;
}

const TradeList: React.FC<TradeListProps> = ({
  trades,
  title,
  className,
  emptyMessage = "No trades to display"
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: TradeSignal['status']) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
      case 'EXECUTED':
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Executed</Badge>;
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Cancelled</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/30">Completed</Badge>;
      default:
        return null;
    }
  };

  const formatProfit = (profit?: number) => {
    if (profit === undefined) return '';
    
    const formattedProfit = profit.toFixed(2);
    const isPositive = profit > 0;
    
    return (
      <span className={isPositive ? 'text-success font-medium' : 'text-destructive font-medium'}>
        {isPositive ? '+' : ''}{formattedProfit}
      </span>
    );
  };

  return (
    <Card className={cn("h-full transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="px-0 pt-2">
        {trades.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-0 overflow-hidden rounded-md">
            {trades.map((trade, index) => (
              <div 
                key={trade.id}
                className={cn(
                  "flex items-center justify-between py-3 px-6 transition-colors",
                  index % 2 === 0 ? "bg-secondary/30" : "bg-transparent",
                  "hover:bg-secondary/60 transition-colors duration-150"
                )}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className={cn(
                      "inline-block w-2 h-2 rounded-full mr-2",
                      trade.direction === 'BUY' ? "bg-success" : "bg-destructive"
                    )} />
                    <span className="font-medium">{trade.pair}</span>
                    <span className="text-xs ml-2 text-muted-foreground">
                      {trade.direction}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDate(trade.timestamp)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">{trade.entryPrice.toFixed(5)}</div>
                    <div className="text-xs">
                      {formatProfit(trade.profit)}
                    </div>
                  </div>
                  {getStatusBadge(trade.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeList;
