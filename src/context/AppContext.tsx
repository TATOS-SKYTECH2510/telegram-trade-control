
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our context
export type TradeSignal = {
  id: string;
  pair: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  direction: 'BUY' | 'SELL';
  timestamp: Date;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'COMPLETED';
  profit?: number;
};

type User = {
  id: string;
  email: string;
  name: string;
};

type TelegramSettings = {
  botToken: string;
  chatId: string;
  connected: boolean;
  lastSyncTime?: Date;
};

type RiskSettings = {
  maxDailyLoss: number;
  maxDrawdown: number;
  defaultStopLoss: number;
  defaultTakeProfit: number;
  lotSize: number;
  riskPerTrade: number;
  useTrailingStop: boolean;
  maxDailyTrades: number;
  maxSimultaneousTrades: number;
  allowedPairs: string[];
  tradingHours: {
    start: string;
    end: string;
    enabled: boolean;
  };
};

type BotStatus = 'ACTIVE' | 'INACTIVE' | 'ERROR';

type AppContextType = {
  botStatus: BotStatus;
  setBotStatus: (status: BotStatus) => void;
  autoTrading: boolean;
  toggleAutoTrading: () => void;
  accountBalance: number;
  setAccountBalance: (balance: number) => void;
  dailyPnL: number;
  setDailyPnL: (pnl: number) => void;
  tradeSignals: TradeSignal[];
  addTradeSignal: (signal: Omit<TradeSignal, 'id' | 'timestamp'>) => void;
  updateTradeSignal: (id: string, updates: Partial<TradeSignal>) => void;
  telegramSettings: TelegramSettings;
  updateTelegramSettings: (settings: Partial<TelegramSettings>) => void;
  riskSettings: RiskSettings;
  updateRiskSettings: (settings: Partial<RiskSettings>) => void;
  recentTrades: TradeSignal[];
  activeTrades: TradeSignal[];
  totalTrades: number;
  winRate: number;
  // Auth related states and methods
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
};

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data for allowed currency pairs
const DEFAULT_ALLOWED_PAIRS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 
  'USDCHF', 'NZDUSD', 'EURJPY', 'GBPJPY', 'EURGBP'
];

// Sample trading hours (9 AM to 5 PM)
const DEFAULT_TRADING_HOURS = {
  start: '09:00',
  end: '17:00',
  enabled: true,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State declarations
  const [botStatus, setBotStatus] = useState<BotStatus>('INACTIVE');
  const [autoTrading, setAutoTrading] = useState(false);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [dailyPnL, setDailyPnL] = useState(0);
  const [tradeSignals, setTradeSignals] = useState<TradeSignal[]>([]);
  const [telegramSettings, setTelegramSettings] = useState<TelegramSettings>({
    botToken: '',
    chatId: '',
    connected: false,
  });
  
  const [riskSettings, setRiskSettings] = useState<RiskSettings>({
    maxDailyLoss: 100,
    maxDrawdown: 5,
    defaultStopLoss: 10,
    defaultTakeProfit: 25,
    lotSize: 0.01,
    riskPerTrade: 1,
    useTrailingStop: false,
    maxDailyTrades: 10,
    maxSimultaneousTrades: 3,
    allowedPairs: DEFAULT_ALLOWED_PAIRS,
    tradingHours: DEFAULT_TRADING_HOURS,
  });

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tradebolt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Auth functions
  const login = (email: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we're just setting the user
    const newUser = {
      id: '1',
      email,
      name: email.split('@')[0]
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('tradebolt_user', JSON.stringify(newUser));
  };

  const register = (email: string, password: string, name: string) => {
    // In a real app, you would send this to a backend to create the user
    // For demo purposes, we're just setting the user
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      name
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('tradebolt_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('tradebolt_user');
  };

  // Toggle auto trading
  const toggleAutoTrading = () => {
    setAutoTrading(prev => !prev);
    setBotStatus(prev => prev === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE');
  };

  // Add a new trade signal
  const addTradeSignal = (signal: Omit<TradeSignal, 'id' | 'timestamp'>) => {
    const newSignal: TradeSignal = {
      ...signal,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date(),
    };
    setTradeSignals(prev => [newSignal, ...prev]);
  };

  // Update an existing trade signal
  const updateTradeSignal = (id: string, updates: Partial<TradeSignal>) => {
    setTradeSignals(prev => 
      prev.map(signal => 
        signal.id === id ? { ...signal, ...updates } : signal
      )
    );
  };

  // Update telegram settings
  const updateTelegramSettings = (settings: Partial<TelegramSettings>) => {
    setTelegramSettings(prev => ({ ...prev, ...settings }));
  };

  // Update risk settings
  const updateRiskSettings = (settings: Partial<RiskSettings>) => {
    setRiskSettings(prev => ({ ...prev, ...settings }));
  };

  // Computed values
  const recentTrades = tradeSignals.filter(
    signal => signal.status === 'COMPLETED'
  ).slice(0, 10);
  
  const activeTrades = tradeSignals.filter(
    signal => signal.status === 'EXECUTED' || signal.status === 'PENDING'
  );
  
  const totalTrades = tradeSignals.filter(
    signal => signal.status === 'COMPLETED'
  ).length;
  
  const winRate = totalTrades > 0
    ? (tradeSignals.filter(signal => signal.status === 'COMPLETED' && (signal.profit || 0) > 0).length / totalTrades) * 100
    : 0;

  // Context value
  const contextValue: AppContextType = {
    botStatus,
    setBotStatus,
    autoTrading,
    toggleAutoTrading,
    accountBalance,
    setAccountBalance,
    dailyPnL,
    setDailyPnL,
    tradeSignals,
    addTradeSignal,
    updateTradeSignal,
    telegramSettings,
    updateTelegramSettings,
    riskSettings,
    updateRiskSettings,
    recentTrades,
    activeTrades,
    totalTrades,
    winRate,
    // Auth values
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
