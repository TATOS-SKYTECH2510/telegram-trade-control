
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { toast } from '@/hooks/use-toast';
import { Bot, CheckCircle } from 'lucide-react';

const TelegramSetup: React.FC = () => {
  const { telegramSettings, updateTelegramSettings } = useAppContext();
  const [botToken, setBotToken] = useState(telegramSettings.botToken);
  const [chatId, setChatId] = useState(telegramSettings.chatId);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!botToken || !chatId) {
      toast({
        title: "Validation Error",
        description: "Please enter both Bot Token and Chat ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      updateTelegramSettings({
        botToken,
        chatId,
        connected: true,
        lastSyncTime: new Date(),
      });
      
      setLoading(false);
      
      toast({
        title: "Telegram Connected",
        description: "Successfully connected to Telegram",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    updateTelegramSettings({
      connected: false,
    });
    
    toast({
      title: "Telegram Disconnected",
      description: "Disconnected from Telegram",
    });
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-xl">Telegram Integration</CardTitle>
        </div>
        <CardDescription>
          Connect to Telegram to receive and process trade signals
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="botToken">Bot Token</Label>
          <Input
            id="botToken"
            type="password"
            placeholder="Enter your Telegram bot token"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            disabled={telegramSettings.connected}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Get this from @BotFather on Telegram
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="chatId">Chat ID</Label>
          <Input
            id="chatId"
            placeholder="Enter channel or group chat ID"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            disabled={telegramSettings.connected}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            The channel or group where signals are posted
          </p>
        </div>
        
        {telegramSettings.connected ? (
          <div className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-md text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-success" />
                <p className="font-medium text-success">Successfully Connected</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Last synced: {telegramSettings.lastSyncTime?.toLocaleString() || 'Never'}
              </p>
            </div>
            
            <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Telegram"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TelegramSetup;
