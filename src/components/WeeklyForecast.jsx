import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { getWeeklyForecast } from '../api.js';
import { useMemo } from 'react';

const OneDayWeather = ({ data }) => {
  return (
    <>
      <div className="w-16 h-32 bg-gray-200 rounded-md flex flex-col">
        {/* <span>{data && DateTime.fromMillis(data?.dt)}</span> */}
      </div>
    </>
  );
};

export const WeeklyForecast = ({ cityName }) => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['weekly', cityName],
    queryFn: () => getWeeklyForecast(cityName),
  });

  const everyDay = useMemo(() => {
    const arr = [];
    if (data && !isFetching) {
      for (let i = 0; i < data.list.length - 1; i + 8) {
        // arr.push(data.list.slice(i, i + 8));
        // console.log(i);
      }
    }
    console.log(data?.list);
    console.log(arr);
    return arr;
  }, [cityName, isLoading]);
  console.log(everyDay);

  if (isLoading) return <span>Loading...</span>;

  if (error) {
    return <h1>Something was wrong</h1>;
  }

  return (
    <div className="pt-10">
      <h1 className="text-xl font-semibold">WEEKLY FORECAST</h1>
      <div className="flex justify-between w-3/5 pt-4">
        <OneDayWeather data={everyDay[0]} />
        <OneDayWeather data={everyDay[1]} />
        <OneDayWeather data={everyDay[2]} />
        <OneDayWeather data={everyDay[3]} />
        <OneDayWeather data={everyDay[4]} />
      </div>
    </div>
  );
};
