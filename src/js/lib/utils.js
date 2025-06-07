export const $ = (selector) => document.querySelector(selector);
export const on = (el, event, handler) => el.addEventListener(event, handler);
export const delegate = (el, selector, event, handler) => {
  el.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && el.contains(target)) {
      handler(e, target);
    }
  });
};

export const formatCloudiness = (percent) => {
  if (percent < 10) return "Clear";
  if (percent < 30) return "Mostly Clear";
  if (percent < 70) return "Partly Cloudy";
  if (percent < 88) return "Mostly Cloudy";
  return "Overcast";
};

export const mapTemperature = (temp) => {
  if (temp < -10) return "#4b4b99";
  if (temp < 0) return "#5f75d1";
  if (temp < 5) return "#89a6f3";
  if (temp < 10) return "#a4c2f4";
  if (temp < 15) return "#cddc39";
  if (temp < 20) return "#ffe066";
  if (temp < 25) return "#ff9c66";
  if (temp < 30) return "#ff7043";
  return "#e53935";
};
