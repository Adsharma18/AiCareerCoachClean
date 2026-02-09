import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';  // ← Make sure this is imported (for Tailwind)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,           // retry failed queries once
      staleTime: 1000 * 60, // optional: keep data fresh for 1 minute
    },
    mutations: {
      retry: 0,           // don't retry mutations
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);