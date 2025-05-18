// src/components/layout/TmsSidebar.tsx
import React, { useState, ElementType, ReactNode, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Home, Package, Truck, Users, Settings, Menu, Plus, LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShipTornadoLogo, type ShipTornadoLogoProps } from "@/components/logo/ShipTornadoLogo";
import { useAuth, type UserType } from "@/context/AuthContext";

interface NavItemProps {
  to?: string;
  icon: ElementType;
  label: string;
  isCollapsed: boolean;
  adminOnly?: boolean;
  onClick?: () => void; // ✨ THIS IS THE CORRECTED LINE ✨
  currentPath?: string; // Keep currentPath as it's used in your logic
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, icon: Icon, label, isCollapsed, adminOnly = false, onClick, currentPath 
}) => {
  const { user } = useAuth();
  const location = useLocation(); // location.pathname can also be used instead of passing currentPath

  // Using NavLink's isActive prop for styling is often more robust
  // but your custom isActive logic is fine if it serves your needs.
  // Let's refine it slightly for clarity and to handle root path better.
  const path = currentPath || location.pathname;
  const isActive = to 
    ? (to === "/dashboard" && (path === "/dashboard" || path === "/")) || // Handle '/' as '/dashboard'
      (to !== "/dashboard" && to !== "/" && path.startsWith(to))
    : false;

  const typedUser = user; // user from useAuth() should be UserType | null

  const hasSufficientRole = typedUser && typedUser.roles && (
    typedUser.roles.includes('Super Admin') || 
    typedUser.roles.includes('Company Admin') // Ensure these role names are exact
  );

  if (adminOnly && !hasSufficientRole) return null;
  
  if (onClick) {
    return (
      <Button
        variant="ghost"
        size={isCollapsed ? "icon" : "sm"}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-md transition-colors w-full h-9",
          isCollapsed ? "justify-center px-0" : "justify-start px-3 py-2",
          "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 focus-visible:ring-sidebar-ring outline-none"
        )}
        title={label} // Good for accessibility
      >
        <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
        {!isCollapsed && <span className="truncate text-sm font-medium">{label}</span>}
      </Button>
    );
  }

  // If it's a navigation item, 'to' must be defined
  if (!to) return null; 

  return (
    <NavLink 
      to={to}
      title={label}
      // The `end` prop ensures NavLink is only active for exact path matches,
      // useful for index-like routes (e.g. /dashboard should not be active for /dashboard/details)
      end={to === "/dashboard" || to === "/"} 
      className={({ isActive: navLinkIsActive }) => // Use NavLink's built-in isActive
        cn(
          "flex items-center gap-3 rounded-md transition-colors h-9",
          isCollapsed ? "justify-center px-0 w-9" : "justify-start px-3 py-2",
          navLinkIsActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:ring-1 focus-visible:ring-sidebar-ring outline-none"
        )
      }
    >
      <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
      {!isCollapsed && <span className="truncate text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

interface TmsSidebarProps {
  isInitiallyCollapsed?: boolean;
  onToggle?: (isCollapsed: boolean) => void;
}

export function TmsSidebar({ isInitiallyCollapsed = false, onToggle }: TmsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(isInitiallyCollapsed);
  const { user, logout } = useAuth(); // user should be UserType | null
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsCollapsed(isInitiallyCollapsed);
  }, [isInitiallyCollapsed]);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  const handleLogout = () => {
    if (logout) { // logout should be: () => void
      logout();
      navigate('/login'); 
    }
  };

  // Ensure 'to' paths here match your router.tsx definitions
  const navItemsConfig = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/orders", icon: Package, label: "Orders" },
    { to: "/shipments", icon: Truck, label: "Shipments" },
    { to: "/create-shipment", icon: Plus, label: "New Shipment" },
    { to: "/admin/users", icon: Users, label: "Manage Users", adminOnly: true },
    { to: "/admin/create-user", icon: Plus, label: "Create User", adminOnly: true },
    { to: "/settings", icon: Settings, label: "Settings" }, // Ensure /pages/Settings.tsx exists
  ];

  return ( 
    <aside className={cn(
      "h-screen flex flex-col bg-sidebar fixed left-0 top-0 z-40 transition-all duration-300 print:hidden",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border h-16 shrink-0">
        <NavLink to="/dashboard" aria-label="Dashboard Home" className={cn("focus-visible:ring-1 focus-visible:ring-sidebar-ring rounded-sm outline-none", isCollapsed ? "w-full flex justify-center" : "")}>
          <ShipTornadoLogo 
            className="text-sidebar-foreground" 
            size={isCollapsed ? 24 : 28} 
            spin={false} 
            hideText={isCollapsed} // Make sure ShipTornadoLogoProps includes 'hideText'
          />
        </NavLink>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-1 focus-visible:ring-sidebar-ring rounded-md",
            isCollapsed ? "absolute top-3.5 right-3.5" : "-mr-1" // Adjust as needed
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 flex flex-col gap-1">
        {navItemsConfig.map((itemConfig) => (
          <NavItem 
            key={itemConfig.to || `action-${itemConfig.label}`}
            to={itemConfig.to}
            icon={itemConfig.icon}
            label={itemConfig.label}
            isCollapsed={isCollapsed}
            adminOnly={itemConfig.adminOnly}
            currentPath={location.pathname} // Pass currentPath for NavItem's logic
          />
        ))}
      </nav>
      
      {user && ( // Show only if user is logged in
        <div className="p-3 border-t border-sidebar-border mt-auto shrink-0">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-semibold text-xs shrink-0">
                  {user.firstName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  {user.lastName?.[0]?.toUpperCase() || ''}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sidebar-foreground font-medium truncate text-sm" title={user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}>
                    {(user.firstName || user.lastName) ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user.email}
                  </div>
                  <div className="text-sidebar-foreground/70 text-xs truncate" title={user.roles?.join(', ')}>
                    {user.roles?.join(', ')}
                  </div>
                </div>
              </div>
              {/* Using NavItem for Logout for consistent styling */}
              <NavItem 
                icon={LogOut} 
                label="Logout" 
                isCollapsed={isCollapsed} 
                onClick={handleLogout}
                currentPath={location.pathname} // currentPath is required by NavItemProps
              />
            </>
          ) : (
            // Collapsed Logout Button
            <NavItem 
                icon={LogOut} 
                label="Logout" 
                isCollapsed={isCollapsed} 
                onClick={handleLogout}
                currentPath={location.pathname} // currentPath is required by NavItemProps
              />
          )}
        </div>
      )}
    </aside>
  );
}