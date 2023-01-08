import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { getWeeklyForecast } from '../api.js';

const OneDayWeather = ({ data }) => {
  const dayTemperature = data.reduce((acc, curr) => {
    acc.push(curr.main.temp);
    return acc;
  }, []);
  const maxTemp = Math.max(...dayTemperature);
  const minTemp = Math.min(...dayTemperature);

  const date = DateTime.fromSeconds(data[0]?.dt);

  return (
    <>
      <div className="w-16 h-32 bg-gray-100 rounded-md flex flex-col items-center">
        <span className="text-sm">
          {date.toLocaleString({ weekday: 'short' })}
        </span>
        <span className="text-xs">
          {date.toLocaleString({
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <span className="text-blue-800 font-semibold">
          {maxTemp.toFixed(0)}
        </span>
        <span className="text-gray-500 font-semibold">
          {minTemp.toFixed(0)}
        </span>
      </div>
    </>
  );
};

export const WeeklyForecast = ({ cityName }) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['weekly', cityName.toLowerCase()],
    queryFn: () => getWeeklyForecast(cityName),
    refetchOnWindowFocus: false,
  });

  const everyDay = useMemo(() => {
    const arr = [[], [], [], [], [], []];
    const now = DateTime.now();

    if (data && !isFetching) {
      let offset = 0;
      for (let timestamp of data.list) {
        const date = DateTime.fromSeconds(timestamp.dt);
        const compare = now.plus({ days: offset });
        if (date.hasSame(compare, 'day')) {
          arr[offset].push(timestamp);
        } else {
          offset += 1;
          arr[offset].push(timestamp);
        }
      }
    }
    return arr;
  }, [cityName, data, isFetching]);
  console.log(everyDay);

  if (error) {
    return <h1>Something was wrong</h1>;
  }

  return (
    <div className="pt-10">
      <h1 className="text-xl font-semibold">WEEKLY FORECAST</h1>
      <div className="flex justify-between w-4/5 pt-4">
        {isFetching ? (
          <span>Loading...</span>
        ) : (
          everyDay.map((day, index) => {
            return <OneDayWeather key={index} data={day} />;
          })
        )}
      </div>
    </div>
  );
};
