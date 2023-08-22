'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import { SocketContextProvider } from './socket/socketContext';


const GlobalModals = dynamic(() => import('./global/GlobalModals'), {
  ssr: false,
});
const GlobalAlerts = dynamic(() => import('./global/GlobalAlerts'), {
  ssr: false,
});

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      
         <GlobalModals/>
         <GlobalAlerts/>
        
        {children}
      
      </ThemeProvider>
      </SocketContextProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default Providers;
