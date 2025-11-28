import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { psxTasks, categories } from "@/lib/psx-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredTasks = psxTasks.filter(task => {
    const matchesCategory = task.category === activeCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSidebarOpen(false);
          }} 
        />
      </div>
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="h-14 sm:h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 sm:px-6 lg:px-8 justify-between shrink-0 z-30 gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 shrink-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">{activeCategory}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Browse tasks and copy code for Google Colab</p>
            </div>
          </div>
          <div className="relative w-full sm:w-48 md:w-64 shrink-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search tasks..." 
              className="pl-9 bg-secondary/50 border-transparent focus-visible:ring-primary/50 focus-visible:bg-background transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 pb-12 sm:pb-16 md:pb-20">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary bg-primary/5 shrink-0">
                          Task {task.id}
                        </Badge>
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground break-words">{task.title}</h2>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  
                  <CodeBlock code={task.code} title={task.title} />
                  
                  <div className="h-px bg-border/50 w-full mt-6 sm:mt-8" />
                </div>
              ))
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-20">
                <p className="text-muted-foreground text-sm sm:text-base">No tasks found in this category matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
