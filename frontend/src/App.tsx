// ship-tornado-v3/frontend/src/App.tsx
import React, { JSX, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Will become AuthContext.tsx
import AppRoutes from './router'; // Will likely become AppRoutes.tsx or router.tsx
import TornadoLoader from './components/TornadoLoader';
import './styles/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App(): JSX.Element { // Explicit return type
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider> {/* AuthProvider itself will need to accept ReactNode children */}
          <Router>
            <ShadcnToaster />
            <Sonner />
            <Suspense fallback={<TornadoLoader />}>
              <AppRoutes />
            </Suspense>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;