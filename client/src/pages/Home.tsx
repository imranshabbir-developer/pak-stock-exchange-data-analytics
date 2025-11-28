import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, BarChart2, Code2 } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_financial_data_visualization_with_charts_and_graphs_in_dark_mode.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background z-10" />
        <img 
          src={heroBg} 
          alt="Financial Data Background" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/5 bg-background/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-base sm:text-lg md:text-xl tracking-tight">
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground shrink-0">
              <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 truncate max-w-[200px] sm:max-w-none">
              <span className="hidden sm:inline">PSX Analytics - UET (MSDS - Weekend)</span>
              <span className="sm:hidden">PSX Analytics</span>
            </span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-foreground text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10">
              <span className="hidden sm:inline">Enter Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-700 w-full">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="whitespace-nowrap">Google Colab Ready Code Generator</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display tracking-tight leading-tight sm:leading-tight text-white px-2">
            Master Pakistan Stock Exchange <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-teal-400">
              Data Analytics
            </span>
          </h1>
          
          <div className="space-y-1 sm:space-y-2 text-lime-400 px-4">
            <p className="text-sm sm:text-base md:text-lg break-words">Prepared by: (Muhammad Imran Shabbir MSDS-102)</p>
            <p className="text-sm sm:text-base md:text-lg break-words">Presented to: (Dr. Amjad Farooq sb)</p>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Access 60+ ready-to-run Python snippets for Google Colab. 
            From data collection to machine learning models for PSX.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-10px_hsl(var(--primary))]">
                <span className="hidden sm:inline">Start Analysis Tasks</span>
                <span className="sm:hidden">Start Tasks</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                <span className="hidden sm:inline">Open Google Colab</span>
                <span className="sm:hidden">Open Colab</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6">
          {[
            {
              icon: Database,
              title: "Data Collection",
              desc: "Scripts to fetch and clean PSX data from multiple sources."
            },
            {
              icon: BarChart2,
              title: "Visual Analytics",
              desc: "Generate professional candlestick charts and heatmaps."
            },
            {
              icon: Code2,
              title: "ML Forecasting",
              desc: "ARIMA, Prophet, and LSTM models ready to copy-paste."
            }
          ].map((feature, i) => (
            <div key={i} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm hover:bg-card/80 transition-colors text-left group">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="relative z-20 py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground border-t border-white/5 bg-background px-4">
        <p className="break-words">2025-MSDS-102 - Muhammad Imran Shabbir © Adv. Big Data Analytics Sir. Amjad Farooq sb</p>
        <p className="break-words mt-1 sm:mt-2">University of Engineering and Technology, Lahore - MSDS - Weekend</p>
      </footer>
    </div>
  );
}
