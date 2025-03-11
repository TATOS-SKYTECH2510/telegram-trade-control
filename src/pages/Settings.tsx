
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import Header from '@/components/layout/Header';
import TelegramSetup from '@/components/telegram/TelegramSetup';
import RiskManagement from '@/components/settings/RiskManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings: React.FC = () => {
  return (
    <>
      <Header />
      <DashboardLayout>
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your trading bot and risk management parameters
          </p>
        </div>
        
        <Tabs defaultValue="telegram" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="telegram">Telegram Integration</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="filters">Signal Filters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="telegram" className="animate-fade-in">
            <TelegramSetup />
          </TabsContent>
          
          <TabsContent value="risk" className="animate-fade-in">
            <RiskManagement />
          </TabsContent>
          
          <TabsContent value="filters" className="animate-fade-in">
            <div className="glass-card rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Signal Filters</h3>
              <p className="text-muted-foreground">
                Signal filtering features will be available in the next update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </>
  );
};

export default Settings;
