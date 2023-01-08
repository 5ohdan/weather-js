import axios from 'axios';

export const getDailyWeather = async (cityName) => {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
    .then((response) => response.data);
};

export const getWeeklyForecast = async (cityName) => {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
    .then((response) => response.data);
};
