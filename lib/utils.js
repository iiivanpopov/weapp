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
