// src/pages/Index.tsx (Assuming this is the intended location and filename for your main dashboard)
import React from 'react'; // Added React import
import { Package, Truck, Clock, DollarSign } from "lucide-react";
import { TmsLayout } from "@/components/layout/TmsLayout";
import { StatCard } from "@/components/dashboard/StatCard";       // Ensure these components are copied and typed
import { ShipmentCard } from "@/components/dashboard/ShipmentCard"; // Ensure these components are copied and typed
import { ShipmentsChart, DeliveryPerformanceChart } from "@/components/dashboard/DashboardCharts"; // Ensure these are copied and typed
import { Button } from "@/components/ui/button"; // Ensure this is the typed shadcn/ui button

// Sample shipment data - consider defining a type for this
interface Shipment {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
  status: "in_transit" | "delivered" | "pending" | "canceled"; // Added "canceled" for completeness
  client: string;
}

const recentShipments: Shipment[] = [ // Typed the array
  {
    id: "SH-1234",
    title: "Construction Materials",
    origin: "Boston, MA",
    destination: "New York, NY",
    date: "May 15, 2025", // Dates should ideally be Date objects or ISO strings if processed
    status: "in_transit",
    client: "ABC Construction",
  },
  {
    id: "SH-1235",
    title: "Electronics Package",
    origin: "San Francisco, CA",
    destination: "Los Angeles, CA",
    date: "May 14, 2025",
    status: "delivered",
    client: "Tech Solutions Inc",
  },
  {
    id: "SH-1236",
    title: "Medical Supplies",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    date: "May 16, 2025",
    status: "pending",
    client: "MediCorp",
  },
];

const Index = (): JSX.Element => { // Changed component name to Index for clarity if it's the default export
  return (
    <TmsLayout>
      <div className="animate-fade-in space-y-8"> {/* Added space-y-8 for consistent spacing */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1> {/* Use theme color */}
            <p className="text-muted-foreground">Overview of your transportation operations</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-stretch gap-2 md:gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90"> {/* Use theme colors */}
              <Package className="mr-2 h-4 w-4" /> New Shipment
            </Button>
            <Button variant="outline">View Reports</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Active Shipments" 
            value="128" 
            icon={<Package className="h-5 w-5 text-primary" />}  // Example: theming icon
            trend={{ value: "12%", positive: true }}
          />
          <StatCard 
            title="Fleet Utilization" 
            value="86%" 
            icon={<Truck className="h-5 w-5 text-primary" />} 
            trend={{ value: "4%", positive: true }}
          />
          <StatCard 
            title="On-Time Delivery" 
            value="92%" 
            icon={<Clock className="h-5 w-5 text-destructive" />} // Example: different color for negative trend
            trend={{ value: "3%", positive: false }}
          />
          <StatCard 
            title="Revenue (MTD)" 
            value="$143,500" 
            icon={<DollarSign className="h-5 w-5 text-green-600" />} // Example
            trend={{ value: "8%", positive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 min-h-[250px] sm:min-h-[300px]"> {/* Ensure chart has enough height */}
            <ShipmentsChart />
          </div>
          <div className="min-h-[250px] sm:min-h-[300px]">
            <DeliveryPerformanceChart />
          </div>
        </div>

        {/* Recent Shipments */}
        <div> {/* Removed mb-8 from here as parent has space-y-8 */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Recent Shipments</h2> {/* Use theme color */}
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {recentShipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>
      </div>
    </TmsLayout>
  );
};

export default Index;