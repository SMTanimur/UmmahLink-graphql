"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider  attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
