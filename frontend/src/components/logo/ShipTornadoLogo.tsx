// src/components/logo/ShipTornadoLogo.tsx
import React from 'react'; // Ensure React is imported
import { Tornado } from "lucide-react"; // Or your specific logo icon
import { cn } from "@/lib/utils";

export interface ShipTornadoLogoProps {
  className?: string;
  size?: number;
  spin?: boolean;
  hideText?: boolean; // Added this prop
}

export function ShipTornadoLogo({ 
  className, 
  size = 28, // Default size from TmsSidebar usage
  spin = false, 
  hideText = false // Default to false
}: ShipTornadoLogoProps): React.ReactElement {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Tornado 
        size={size} 
        className={cn(
          "text-current", // Inherits color from parent by default
          spin && "animate-spin" // Your animation class if you have one
        )} 
      />
      {/* Conditionally render the text based on hideText prop */}
      {!hideText && <span className="font-bold text-lg whitespace-nowrap">Ship Tornado</span>}
    </div>
  );
}