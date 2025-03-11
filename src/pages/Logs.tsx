
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Filter } from 'lucide-react';

// Sample log data
const sampleLogs = [
  { id: 1, type: 'INFO', message: 'Bot started successfully', timestamp: new Date(2023, 4, 15, 9, 30, 0) },
  { id: 2, type: 'INFO', message: 'Connected to Telegram API', timestamp: new Date(2023, 4, 15, 9, 30, 5) },
  { id: 3, type: 'SIGNAL', message: 'Received signal for EURUSD: BUY @ 1.08765', timestamp: new Date(2023, 4, 15, 9, 45, 0) },
  { id: 4, type: 'TRADE', message: 'Executed BUY order for EURUSD @ 1.08765', timestamp: new Date(2023, 4, 15, 9, 45, 2) },
  { id: 5, type: 'WARNING', message: 'Signal for GBPJPY ignored - insufficient risk/reward ratio', timestamp: new Date(2023, 4, 15, 10, 15, 0) },
  { id: 6, type: 'SIGNAL', message: 'Received signal for USDJPY: SELL @ 151.435', timestamp: new Date(2023, 4, 15, 10, 30, 0) },
  { id: 7, type: 'TRADE', message: 'Executed SELL order for USDJPY @ 151.435', timestamp: new Date(2023, 4, 15, 10, 30, 2) },
  { id: 8, type: 'ERROR', message: 'Failed to parse signal format from channel', timestamp: new Date(2023, 4, 15, 11, 0, 0) },
  { id: 9, type: 'INFO', message: 'Daily stats: 2 trades executed, 1 signal ignored', timestamp: new Date(2023, 4, 15, 17, 0, 0) },
  { id: 10, type: 'TRADE', message: 'Trade closed: EURUSD BUY with +18.7 profit', timestamp: new Date(2023, 4, 15, 14, 30, 0) },
];

const Logs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };
  
  const getLogBadge = (type: string) => {
    switch (type) {
      case 'INFO':
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Info</Badge>;
      case 'WARNING':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Warning</Badge>;
      case 'ERROR':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Error</Badge>;
      case 'SIGNAL':
        return <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted/50">Signal</Badge>;
      case 'TRADE':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/30">Trade</Badge>;
      default:
        return null;
    }
  };
  
  const filteredLogs = sampleLogs
    .filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType ? log.type === filterType : true;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  const handleFilterClick = (type: string) => {
    setFilterType(current => current === type ? null : type);
  };

  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            View system logs, trade executions, and Telegram signals
          </p>
        </div>
        
        <Card className="overflow-hidden animate-fade-in">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={filterType === 'INFO' ? 'bg-primary/10' : ''}
                  onClick={() => handleFilterClick('INFO')}
                >
                  Info
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={filterType === 'WARNING' ? 'bg-warning/10' : ''}
                  onClick={() => handleFilterClick('WARNING')}
                >
                  Warning
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={filterType === 'ERROR' ? 'bg-destructive/10' : ''}
                  onClick={() => handleFilterClick('ERROR')}
                >
                  Error
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={filterType === 'SIGNAL' ? 'bg-muted/50' : ''}
                  onClick={() => handleFilterClick('SIGNAL')}
                >
                  Signal
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={filterType === 'TRADE' ? 'bg-success/10' : ''}
                  onClick={() => handleFilterClick('TRADE')}
                >
                  Trade
                </Button>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-[550px]">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-muted-foreground">No logs found</p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredLogs.map((log, index) => (
                  <div 
                    key={log.id}
                    className={`flex items-start justify-between p-4 ${
                      index % 2 === 0 ? 'bg-secondary/30' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        {getLogBadge(log.type)}
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </DashboardLayout>
    </>
  );
};

export default Logs;
