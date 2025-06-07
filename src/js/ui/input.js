import { elements } from "./dom.js";
import { SORTED_CITIES } from "../lib/constants.js";

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
export const getFilteredCities = () => {
  return filteredCities;
};
