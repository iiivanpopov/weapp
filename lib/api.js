import { config } from "./config.js";

export const fetchWeather = async (city) => {
  const response = await fetch(
    `${config.currentWeatherUrl()}&q=${encodeURIComponent(city)}`,
  );
  return await response.json();
};
