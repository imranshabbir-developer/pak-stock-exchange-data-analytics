import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { openInColab } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'python', title = 'PSX Analytics Code' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Code copied!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const handleOpenInColab = () => {
    openInColab(code, title);
    toast({
      title: "Opening Google Colab",
      description: "A notebook file has been downloaded. Upload it to Colab or paste the code from your clipboard.",
    });
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-[#1e1e1e] shadow-sm">
      <div className="absolute top-2 right-2 z-10 flex gap-1.5 sm:gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleOpenInColab}
          className="h-7 w-7 sm:h-8 sm:w-8 bg-primary/10 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50"
          title="Open in Google Colab"
        >
          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleCopy}
          className="h-7 w-7 sm:h-8 sm:w-8 bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground"
          title="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        </Button>
      </div>
      <div className="bg-[#2d2d2d] px-3 sm:px-4 py-1 text-xs text-muted-foreground font-mono border-b border-border flex items-center gap-2 overflow-x-auto">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <span className="ml-2 whitespace-nowrap">Google Colab / Jupyter Notebook</span>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            lineHeight: '1.5',
            background: 'transparent',
          }}
          wrapLines={true}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-border bg-[#2d2d2d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <span className="text-xs text-muted-foreground">Ready for Google Colab</span>
        <Button
          onClick={handleOpenInColab}
          size="sm"
          className="h-7 sm:h-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm"
        >
          <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5" />
          <span className="hidden sm:inline">Open in Colab</span>
          <span className="sm:hidden">Open Colab</span>
        </Button>
      </div>
    </div>
  );
}
