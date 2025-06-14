import { elements } from "./dom.js";

export const displayForecast = (forecast) => {
  const {
    forecast: { forecastday },
    location: { name, country },
  } = forecast;

  let html = `<div class="forecast">`;
  html += `<span class="forecast__place">${country} ${name}</span>`;

  html += `<div class="forecast__days">`;
  forecastday.forEach((day) => {
    const { date } = day;
    const { avgtemp_c, maxtemp_c, mintemp_c } = day.day;

    html += `<div class="forecast__table">`;
    html += `<span class="forecast__title" title="date, max-min(avg)°C">${date}, ${mintemp_c}-${maxtemp_c}(${avgtemp_c})°C</span>`;

    html += `<div class="forecast__grid">`;
    day.hour.forEach(({ temp_c, condition: { icon } }, index) => {
      const delay = (index * 0.05).toFixed(2);

      html += `
        <div class="forecast__hour" style="animation-delay: ${delay}s;">
          <img class="forecast__icon" src="${icon}" alt="condition"/>
          <span class="forecast__time">${index.toString().padStart(2, "0")}:00</span>
          <span class="forecast__temperature">${temp_c}°C</span>
        </div>`;
    });
    html += `</div>`;

    html += `</div>`;
  });
  html += `</div>`;

  html += `</div>`;

  elements.forecastDisplay.innerHTML = html;
};
