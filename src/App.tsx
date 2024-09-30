import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NameForm } from '@components/NameForm';

import './App.scss';

const queryClient = new QueryClient()

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
