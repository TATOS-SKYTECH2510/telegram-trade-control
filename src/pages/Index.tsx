
import React, { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/Dashboard';
import Header from '@/components/layout/Header';
import StatCard from '@/components/ui/StatCard';
import TradeList from '@/components/trades/TradeList';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpDown, 
  TrendingUp, 
  BarChart4, 
  Wallet,
  BellRing,
  LineChart,
  RefreshCcw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const { 
    accountBalance, 
    dailyPnL, 
    botStatus, 
    recentTrades, 
    activeTrades,
    winRate,
    totalTrades,
    toggleAutoTrading,
    autoTrading,
    addTradeSignal,
    updateTradeSignal
  } = useAppContext();

  // Add sample trades for demo purposes
  useEffect(() => {
    if (recentTrades.length === 0 && activeTrades.length === 0) {
      // Add some active trades
      addTradeSignal({
        pair: 'EURUSD',
        entryPrice: 1.08765,
        stopLoss: 1.08665,
        takeProfit: 1.08965,
        direction: 'BUY',
        status: 'EXECUTED',
      });

      addTradeSignal({
        pair: 'GBPUSD',
        entryPrice: 1.27432,
        stopLoss: 1.27232,
        takeProfit: 1.27832,
        direction: 'BUY',
        status: 'PENDING',
      });

      // Add some completed trades
      const completedTrades = [
        {
          pair: 'USDJPY',
          entryPrice: 151.435,
          stopLoss: 151.635,
          takeProfit: 151.035,
          direction: 'SELL',
          status: 'COMPLETED',
          profit: 32.5,
        },
        {
          pair: 'EURUSD',
          entryPrice: 1.08432,
          stopLoss: 1.08332,
          takeProfit: 1.08632,
          direction: 'BUY',
          status: 'COMPLETED',
          profit: 18.7,
        },
        {
          pair: 'GBPJPY',
          entryPrice: 187.654,
          stopLoss: 187.454,
          takeProfit: 188.054,
          direction: 'BUY',
          status: 'COMPLETED',
          profit: -15.2,
        },
        {
          pair: 'AUDUSD',
          entryPrice: 0.65743,
          stopLoss: 0.65943,
          takeProfit: 0.65443,
          direction: 'SELL',
          status: 'COMPLETED',
          profit: 22.1,
        },
      ];

      completedTrades.forEach(trade => {
        addTradeSignal(trade);
      });
    }
  }, [addTradeSignal, recentTrades.length, activeTrades.length]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const refreshData = () => {
    toast({
      title: "Refreshed",
      description: "Dashboard data has been updated",
    });
  };

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={refreshData}
          >
            <RefreshCcw size={14} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Account Balance"
            value={formatCurrency(accountBalance)}
            icon={Wallet}
            fadeIn
          />
          
          <StatCard 
            title="Today's P&L"
            value={formatCurrency(dailyPnL)}
            icon={ArrowUpDown}
            trend={{
              value: 3.2,
              isPositive: dailyPnL >= 0
            }}
            valueClassName={dailyPnL >= 0 ? "text-profit" : "text-loss"}
            fadeIn
            fadeInDelay={100}
          />
          
          <StatCard 
            title="Win Rate"
            value={`${winRate.toFixed(1)}%`}
            icon={TrendingUp}
            fadeIn
            fadeInDelay={200}
          />
          
          <StatCard 
            title="Total Trades"
            value={totalTrades}
            icon={BarChart4}
            fadeIn
            fadeInDelay={300}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant={autoTrading ? "default" : "outline"}
                className={`h-auto py-4 px-5 transition-all duration-300 ${
                  autoTrading ? "bg-success hover:bg-success/90" : ""
                }`}
                onClick={toggleAutoTrading}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-8 w-8 mb-2 flex items-center justify-center rounded-full bg-primary/10">
                    {autoTrading ? (
                      <div className="relative">
                        <div className="animate-ping absolute h-5 w-5 rounded-full bg-success/30" />
                        <div className="relative h-3 w-3 rounded-full bg-success" />
                      </div>
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                  <span className="font-medium">{autoTrading ? "Auto Trading ON" : "Auto Trading OFF"}</span>
                  <span className="text-xs mt-1 text-muted-foreground">
                    {autoTrading ? "Bot is actively trading" : "Click to enable auto trading"}
                  </span>
                </div>
              </Button>

              <div className="glass-card rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <div className="h-8 w-8 mb-2 flex items-center justify-center rounded-full bg-primary/10">
                  <BellRing size={16} className="text-primary" />
                </div>
                <span className="font-medium">Signal Quality</span>
                <span className="text-xs mt-1 text-muted-foreground">
                  High quality signals
                </span>
              </div>

              <div className="glass-card rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <div className="h-8 w-8 mb-2 flex items-center justify-center rounded-full bg-primary/10">
                  <LineChart size={16} className="text-primary" />
                </div>
                <span className="font-medium">Performance</span>
                <span className="text-xs mt-1 text-muted-foreground">
                  +12.3% this month
                </span>
              </div>
            </div>

            <TradeList 
              trades={activeTrades} 
              title="Active Trades"
              className="animate-fade-in animation-delay-300"
              emptyMessage="No active trades"
            />
          </div>

          <TradeList 
            trades={recentTrades} 
            title="Recent Trades"
            className="h-full animate-fade-in animation-delay-500"
            emptyMessage="No recent trades"
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Index;
