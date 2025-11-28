import { categories } from "@/lib/psx-data";
import { cn } from "@/lib/utils";
import { FileCode, BarChart3, Database, LineChart, PieChart, BrainCircuit } from "lucide-react";

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  // Helper to get icon
  const getIcon = (cat: string) => {
    if (cat.includes("Data Collection")) return <Database className="h-4 w-4" />;
    if (cat.includes("Visualization")) return <BarChart3 className="h-4 w-4" />;
    if (cat.includes("Statistical")) return <PieChart className="h-4 w-4" />;
    if (cat.includes("Machine Learning")) return <BrainCircuit className="h-4 w-4" />;
    if (cat.includes("Reporting")) return <FileCode className="h-4 w-4" />;
    return <LineChart className="h-4 w-4" />;
  };

  return (
    <div className="w-64 sm:w-72 border-r border-border h-screen bg-sidebar flex flex-col sticky top-0 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-border shrink-0">
        <div className="flex items-center gap-2 text-primary">
          <div className="bg-primary/20 p-1.5 rounded-md shrink-0">
            <LineChart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-sidebar-foreground truncate">PSX Analytics</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3 sm:py-4 px-2 sm:px-3 space-y-1">
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Task Categories
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "w-full text-left px-2 sm:px-3 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center gap-2 sm:gap-3 group",
              activeCategory === category
                ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span className={cn(
              "transition-colors shrink-0",
              activeCategory === category ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
            )}>
              {getIcon(category)}
            </span>
            <span className="truncate text-left">{category.split('.')[1] || category}</span>
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-4 border-t border-border bg-sidebar-accent/30 shrink-0">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-sidebar-foreground mb-1 break-words">2025-MSDS-102 - Muhammad Imran Shabbir</p>
          <p className="break-words">Adv. Big Data Analytics Sir. Amjad Farooq sb</p>
        </div>
      </div>
    </div>
  );
}
