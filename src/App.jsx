import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Header } from './components/Header';
import { DailyForecast } from './components/DailyForecast';
import { WeeklyForecast } from './components/WeeklyForecast';

const queryClient = new QueryClient();

export const App = () => {
  const [city, setCity] = useState('Tbilisi');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center mx-auto w-3/5">
        <Header onChange={setCity} city={city} />
        <DailyForecast cityName={city} />
        <WeeklyForecast cityName={city} />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
};
