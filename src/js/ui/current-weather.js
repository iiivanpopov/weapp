import { elements } from "./dom.js";
import { formatCloudiness, mapTemperature } from "../lib/utils.js";

const updateWeatherUI = ({
  location: { name, country, localtime },
  current: { temp_c, humidity, wind_dir, wind_kph, cloud },
}) => {
  const weatherData = {
    city: name,
    country,
    localtime,
    temperature: `${temp_c}°C`,
    humidity: `${humidity}%`,
    "wind-direction": wind_dir,
    "wind-speed": `${wind_kph}km/h`,
    cloud: formatCloudiness(cloud),
  };

  for (const [key, value] of Object.entries(weatherData)) {
    elements.responseElements[key].textContent = value;
  }

  const temperatureColor = mapTemperature(temp_c);
  elements.temperatureGradient.style.background = `linear-gradient(0deg, ${temperatureColor}80 0%, ${temperatureColor}00 100%)`;
};

export const displayCurrentWeather = (weather) => {
  if (!elements.responseContainer) return;

  elements.fetchBtn.disabled = true;
  elements.error.textContent = "";
  elements.temperatureGradient.style.background = "";

  elements.fetchBtn.disabled = false;

  if (weather.error) {
    elements.error.textContent = weather.error.message;
    elements.responseContainer.classList.remove("glow-light", "glow-dark");
    for (const key of Object.keys(elements.responseElements)) {
      elements.responseElements[key].textContent = "";
    }
  } else {
    updateWeatherUI(weather);
    elements.cityInput.classList.remove("no-results");
  }
};
