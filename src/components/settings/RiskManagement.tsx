
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useAppContext } from '@/context/AppContext';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

const RiskManagement: React.FC = () => {
  const { riskSettings, updateRiskSettings } = useAppContext();
  const [formState, setFormState] = React.useState({ ...riskSettings });
  
  const handleChange = (field: keyof typeof formState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    updateRiskSettings(formState);
    toast({
      title: "Risk settings updated",
      description: "Your risk management settings have been saved",
    });
  };

  const handleToggleTrailingStop = () => {
    handleChange('useTrailingStop', !formState.useTrailingStop);
  };

  return (
    <Card className="animate-fade-in transition-all duration-300">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-xl">Risk Management</CardTitle>
        </div>
        <CardDescription>
          Configure risk settings to protect your trading account
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Account Protection</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxDailyLoss">Max Daily Loss ($)</Label>
              <Input
                id="maxDailyLoss"
                type="number"
                value={formState.maxDailyLoss}
                onChange={(e) => handleChange('maxDailyLoss', Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Stop trading if daily loss exceeds this amount
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={[formState.maxDrawdown]}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleChange('maxDrawdown', value[0])}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Current: {formState.maxDrawdown}%</span>
                  <span className="text-xs text-muted-foreground">Max: 20%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Stop trading if account drawdown reaches this level
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Trade Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultStopLoss">Default Stop Loss (pips)</Label>
              <Input
                id="defaultStopLoss"
                type="number"
                value={formState.defaultStopLoss}
                onChange={(e) => handleChange('defaultStopLoss', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultTakeProfit">Default Take Profit (pips)</Label>
              <Input
                id="defaultTakeProfit"
                type="number"
                value={formState.defaultTakeProfit}
                onChange={(e) => handleChange('defaultTakeProfit', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lotSize">Fixed Lot Size</Label>
              <Input
                id="lotSize"
                type="number"
                step="0.01"
                value={formState.lotSize}
                onChange={(e) => handleChange('lotSize', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskPerTrade">Risk Per Trade (%)</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={[formState.riskPerTrade]}
                  max={5}
                  step={0.1}
                  onValueChange={(value) => handleChange('riskPerTrade', value[0])}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Current: {formState.riskPerTrade}%</span>
                  <span className="text-xs text-muted-foreground">Max: 5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <ToggleSwitch
            checked={formState.useTrailingStop}
            onChange={handleToggleTrailingStop}
            label="Use Trailing Stop Loss"
            description="Automatically adjust stop loss as price moves in your favor"
            className="mt-4"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Trade Limits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxDailyTrades">Max Daily Trades</Label>
              <Input
                id="maxDailyTrades"
                type="number"
                value={formState.maxDailyTrades}
                onChange={(e) => handleChange('maxDailyTrades', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxSimultaneousTrades">Max Simultaneous Trades</Label>
              <Input
                id="maxSimultaneousTrades"
                type="number"
                value={formState.maxSimultaneousTrades}
                onChange={(e) => handleChange('maxSimultaneousTrades', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default RiskManagement;
