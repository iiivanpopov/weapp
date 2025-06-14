const API_KEY = "ba94fc905bc5435686480613253105";
const API_URL = "https://api.weatherapi.com/v1";

export const config = {
  API_KEY,
  API_URL,
  currentWeatherUrl(city) {
    return `${this.API_URL}/current.json?key=${this.API_KEY}&q=${encodeURIComponent(city)}`;
  },
  forecastUrl(city, days) {
    return `${this.API_URL}/forecast.json?key=${this.API_KEY}&q=${encodeURIComponent(city)}&days=${days}`;
  },
};
