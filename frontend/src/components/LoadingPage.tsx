// src/components/LoadingPage.tsx
import React, { JSX } from 'react';
import { Tornado } from "lucide-react"; // Ensure lucide-react is installed
import { cn } from "@/lib/utils"; // Ensure cn utility and lib/utils.ts are available

interface LoadingPageProps {
  className?: string;
  message?: string;
}

export function LoadingPage({ 
  className, 
  message = "Loading your experience..." 
}: LoadingPageProps): JSX.Element {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen bg-background text-foreground",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        {/* Using Tailwind's built-in animate-spin. Ensure 'text-primary' is defined in your theme. */}
        <Tornado size={48} className="animate-spin text-primary" /> 
        <h1 className="text-2xl font-bold text-primary">Ship Tornado</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default LoadingPage;