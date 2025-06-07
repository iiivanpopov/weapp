import { elements } from "./dom.js";
import { on, delegate } from "../lib/utils.js";

import { displayCurrentWeather } from "./current-weather.js";
import {
  filterCities,
  getFilteredCities,
  renderOptions,
  toggleCitiesList,
  updateCitiesUI,
} from "./input.js";
import { fetchForecast, fetchWeather } from "../lib/api.js";
import { displayForecast } from "./forecast.js";

let ignoreBlur = false;

const initInputEvents = () => {
  on(elements.cityInput, "input", (event) => {
    const city = event.target.value;
    filterCities(city);
    const filtered = getFilteredCities();

    updateCitiesUI(filtered);

    if (filtered.length > 0) renderOptions(filtered);
  });

  on(elements.cityInput, "focus", () => {
    const filtered = getFilteredCities();
    updateCitiesUI(filtered);
  });

  on(elements.cityInput, "blur", () => {
    if (ignoreBlur) {
      ignoreBlur = false;
      elements.cityInput.focus();
    } else toggleCitiesList(false);
  });

  on(elements.citiesList, "pointerdown", () => {
    ignoreBlur = true;
  });

  window.addEventListener("DOMContentLoaded", () => {
    const filtered = getFilteredCities();
    renderOptions(filtered);
  });

  selectHandler(async (city) => {
    const response = await fetchWeather(city);
    displayCurrentWeather(response);
  });
};

const selectHandler = (callback) => {
  delegate(elements.citiesList, ".option", "click", async (_, el) => {
    const selectedCity = el.dataset.value;
    elements.cityInput.value = selectedCity;
    updateCitiesUI([]);
    elements.cityInput.classList.remove("no-results");
    elements.cityInput.blur();
    if (callback) await callback(selectedCity);
  });
};

export const initForecastEvents = () => {
  initInputEvents();

  on(elements.fetchBtn, "click", async (e) => {
    e.preventDefault();
    const city = elements.cityInput.value;
    const days = elements.forecastDays.value;
    if (!city || !days) return;
    const response = await fetchForecast(city, days);
    displayForecast(response);
  });
};

export const initCurrentEvents = () => {
  initInputEvents();

  on(elements.fetchBtn, "click", async (e) => {
    e.preventDefault();
    const city = elements.cityInput.value;
    if (!city) return;
    const response = await fetchForecast(city);
    displayCurrentWeather(response);
  });
};
