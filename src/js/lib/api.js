import { config } from "./config.js";

export const fetchWeather = async (city) => {
  const response = await fetch(config.currentWeatherUrl(city));
  return await response.json();
};

export const fetchForecast = async (city, days) => {
  const response = await fetch(config.forecastUrl(city, days));
  return await response.json();
};
