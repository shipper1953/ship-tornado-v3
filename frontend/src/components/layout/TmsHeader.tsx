// src/components/layout/TmsHeader.tsx
import React from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth, UserType } from "@/context/AuthContext"; // Import UserType if not global

export function TmsHeader(): React.ReactElement {
  const { user } = useAuth();
  const typedUser = user as UserType | null; // Or ensure useAuth has fully typed user

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-4 sm:px-6 bg-card text-card-foreground print:hidden">
      <div className="flex-1">
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md bg-background h-9 pl-8 pr-3 border-input focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-muted-foreground hover:text-foreground"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tms-amber opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
        </Button>

        <div className="h-7 w-px bg-border self-center"></div>

        {typedUser ? (
          <div className="text-sm text-right">
            <div className="font-medium text-foreground truncate max-w-[150px] sm:max-w-[200px]">
              {(typedUser.firstName || typedUser.lastName) 
                ? `${typedUser.firstName || ''} ${typedUser.lastName || ''}`.trim() 
                : typedUser.email}
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block">
              {formattedDate}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Loading...</div>
        )}
      </div>
    </header>
  );
}