
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, ArrowRight, BarChart2, Bot, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animationClass } from '@/utils/animations';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card z-10 fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl mx-auto px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in">
        <div className="flex items-center">
          <Activity size={24} className="mr-2 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">TradeBolt</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className={cn(
        "flex-1 pt-32 px-4 max-w-screen-xl mx-auto w-full",
        animationClass({ fadeIn: true })
      )}>
        <div className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Automate Your Trading with TradeBolt
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The intelligent trading solution that connects with Telegram, manages risk, and executes trades automatically.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/register">
                  <Button size="lg" className="px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a 
                  href="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Trading Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to automate your trading workflow with confidence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
              {/* Feature 1 */}
              <div className="relative overflow-hidden rounded-lg border p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Telegram Integration</h3>
                  <p className="text-muted-foreground">
                    Automatically receive and parse trade signals from your Telegram channels.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="relative overflow-hidden rounded-lg border p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Risk Management</h3>
                  <p className="text-muted-foreground">
                    Set custom stop-loss, take-profit, and daily limits to protect your capital.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="relative overflow-hidden rounded-lg border p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Performance Analytics</h3>
                  <p className="text-muted-foreground">
                    Track your trading performance with detailed analytics and visualizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-8 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center">
            <div className="flex items-center">
              <Activity size={20} className="mr-2 text-primary" />
              <span className="text-lg font-medium">TradeBolt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TradeBolt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
