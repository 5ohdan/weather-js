import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { getDailyWeather } from '../api';

import Humidity from '../assets/humidity.svg';
import Pressure from '../assets/pressure.svg';
import Wind from '../assets/wind.svg';

const AdditionalInfo = ({ data }) => {
  const {
    main: { humidity, pressure },
    wind: { speed },
  } = data;
  return (
    <div className="bg-gradient-to-r opacity-60 from-morning-blue to-peach backdrop-opacity-40 min-w-full h-max rounded-b-2xl py-4 px-7">
      <div className="flex justify-between w-2/3">
        <span className="flex">
          <img src={Humidity} /> {humidity} %
        </span>
        <span className="flex">
          <img src={Pressure} /> {pressure}
        </span>
        <span className="flex">
          <img src={Wind} /> {speed}
        </span>
      </div>
    </div>
  );
};

const MainInfo = ({ data }) => {
  const {
    main: { temp, feels_like },
    weather,
    sys: { country },
    name,
  } = data;
  return (
    <div className="flex flex-col bg-gradient-to-r from-morning-blue to-peach text-gray-700 rounded-t-2xl py-9 px-7">
      <span className="opacity-40">
        {DateTime.now().toLocaleString(DateTime.DATETIME_MED)}
      </span>
      <h2 className="text-2xl font-bold">
        {name}, {country}
      </h2>
      <div className="flex items-center">
        <span className="text-5xl mr-2 font-bold">{temp.toFixed(0)}</span>
        <span className="text-sm">Feels like {feels_like.toFixed(0)}</span>
      </div>
      <span className="text-lg opacity-40">{weather[0].main}</span>
    </div>
  );
};

export const DailyForecast = ({ cityName }) => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['daily', cityName.toLowerCase()],
    queryFn: () => getDailyWeather(cityName),
  });

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>{error.response.statusText}</span>;

  return (
    <div className="flex flex-col w-3/5">
      <>
        <MainInfo data={data} />
        <AdditionalInfo data={data} />
      </>
    </div>
  );
};
