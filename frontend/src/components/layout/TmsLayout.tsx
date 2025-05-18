// src/components/layout/TmsLayout.tsx
import React, { ReactNode, useState } from 'react';
import { TmsSidebar } from "./TmsSidebar";
import { TmsHeader } from "./TmsHeader";
import { PageTransition } from "@/components/transitions/PageTransition"; // Ensure path is correct
import { cn } from "@/lib/utils";

interface TmsLayoutProps {
  children: ReactNode;
}

export function TmsLayout({ children }: TmsLayoutProps): React.ReactElement {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State for sidebar

  return (
    <div className={cn("flex min-h-screen bg-background print:bg-white")}>
      <TmsSidebar 
        isInitiallyCollapsed={isSidebarCollapsed} 
        onToggle={setIsSidebarCollapsed} // Pass setter to sidebar
      />
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out print:ml-0",
          // Apply margin based on the sidebar's collapsed state
          isSidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64" 
        )}
      >
        <TmsHeader />
        <main className="flex-1 p-4 md:p-6 print:p-0 overflow-y-auto"> {/* Added overflow-y-auto */}
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}