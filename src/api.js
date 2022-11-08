export const getWeather = async (cityName) => {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`
  );
  const body = await result.json();
  return body;
};
