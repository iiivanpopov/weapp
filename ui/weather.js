import { SORTED_CITIES } from "../lib/constants.js";
import { fetchWeather } from "../lib/api.js";
import { elements } from "./dom.js";
import { formatCloudiness } from "../lib/utils.js";

let filteredCities = [...SORTED_CITIES];

export const renderOptions = (options) => {
  elements.citiesList.innerHTML = options
    .map(
      (city) =>
        `<div class="option" role="option" data-value="${city}">${city}</div>`,
    )
    .join("");
};

export const filterCities = (query) => {
  filteredCities = SORTED_CITIES.filter((city) =>
    city.toLowerCase().startsWith(query.toLowerCase()),
  );
};

export const toggleCitiesList = (visible) => {
  elements.citiesList.style.display = visible ? "block" : "none";
};

export const updateCitiesUI = (cities) => {
  toggleCitiesList(cities.length > 0);
  elements.cityInput.classList.toggle("no-results", cities.length === 0);
};

export const updateWeatherUI = ({
  location: { name, country, localtime },
  current: { temp_c, humidity, wind_dir, wind_kph, cloud, is_day },
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

  elements.responseContainer.classList.toggle("glow-light", is_day);
  elements.responseContainer.classList.toggle("glow-dark", !is_day);
};

export const fetchAndDisplayWeather = async (city) => {
  elements.fetchBtn.disabled = true;
  elements.error.textContent = "";

  const response = await fetchWeather(city);

  elements.fetchBtn.disabled = false;

  if (response.error) {
    elements.error.textContent = response.error.message;
    elements.responseContainer.classList.remove("glow-light", "glow-dark");
    for (const key of Object.keys(elements.responseElements)) {
      elements.responseElements[key].textContent = "";
    }
  } else {
    updateWeatherUI(response);
    elements.cityInput.classList.remove("no-results");
  }
};

export const getFilteredCities = () => {
  return filteredCities;
};
