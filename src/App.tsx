import React from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NameForm } from '@components/NameForm';

import './App.scss';

//to ensure basic error handling
axios.interceptors.response.use((response) => {
  if (response.status.toString().startsWith('2')) {
    return response;
  }
  return Promise.reject(response.statusText);
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, //To preserve API calls
      retry: false //To preserve API calls on failure
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
        <NameForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
