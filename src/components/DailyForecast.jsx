import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { getWeather } from '../api';

const AdditionalInfo = ({ data }) => {
  return (
    <div className="flex justify-between backdrop-opacity-10 min-w-full h-max">
      <span>Humidity {data.main.humidity}</span>
      <span>Pressure {data.main.pressure}</span>
      <span>Wind {data.wind.speed}</span>
    </div>
  );
};

const MainInfo = ({ data }) => {
  return (
    <div className="flex flex-col text-gray-700 ">
      <span className="opacity-40">
        {DateTime.now().toLocaleString(DateTime.DATETIME_MED)}
      </span>
      <h2 className="text-2xl">
        {data?.name}, {data?.sys.country}
      </h2>
      <div className="flex items-center">
        <span className="text-5xl mr-2">{data?.main.temp.toFixed(1)}</span>
        <span className="text-sm">
          Feels like {data?.main.feels_like.toFixed(1)}
        </span>
      </div>
      <span className="text-lg opacity-40">{data?.weather[0].main}</span>
    </div>
  );
};

export const DailyForecast = ({ cityName }) => {
  const { data, isError, isLoading } = useQuery(['weather', cityName], () =>
    getWeather(cityName)
  );

  console.log(data);

  return (
    <div className="flex flex-col bg-gradient-to-r from-morning-blue to-peach w-3/5 rounded-2xl p-7">
      {isError ? (
        'something went wrong'
      ) : data ? (
        <>
          <MainInfo data={data} />
          <AdditionalInfo data={data} />
        </>
      ) : null}
    </div>
  );
};
