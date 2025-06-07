import { elements } from "./dom.js";
import { on, delegate } from "../lib/utils.js";

import {
  renderOptions,
  filterCities,
  updateCitiesUI,
  fetchAndDisplayWeather,
  getFilteredCities,
} from "./weather.js";

let ignoreBlur = false;

export const initEvents = () => {
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
    } else updateCitiesUI([]);
  });

  on(elements.citiesList, "pointerdown", () => {
    ignoreBlur = true;
  });

  delegate(elements.citiesList, ".option", "click", async (_, el) => {
    const selectedCity = el.dataset.value;
    elements.cityInput.value = selectedCity;
    updateCitiesUI([]);
    elements.cityInput.classList.remove("no-results");
    await fetchAndDisplayWeather(selectedCity);
  });

  on(elements.fetchBtn, "click", async (e) => {
    e.preventDefault();
    const city = elements.cityInput.value;
    if (!city) return;
    await fetchAndDisplayWeather(city);
  });

  window.addEventListener("DOMContentLoaded", () => {
    const filtered = getFilteredCities();
    renderOptions(filtered);
  });
};
