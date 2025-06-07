const API_KEY = "YOUR_API_KEY";
const API_URL = "https://api.weatherapi.com/v1";

export const config = {
  API_KEY,
  API_URL,
  currentWeatherUrl() {
    return `${this.API_URL}/current.json?key=${this.API_KEY}`;
  },
};
