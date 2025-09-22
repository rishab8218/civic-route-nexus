import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import StaffManagement from "./pages/StaffManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/map" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Map View</h2><p className="text-muted-foreground mt-2">Interactive map with Mappls integration coming soon</p></div>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Settings</h2><p className="text-muted-foreground mt-2">System configuration and routing rules</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
