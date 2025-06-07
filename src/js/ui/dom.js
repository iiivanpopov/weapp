import { $ } from "../lib/utils.js";

export const elements = {
  cityInput: $(".input"),
  citiesList: $(".options"),
  fetchBtn: $(".submit"),
  error: $(".error"),
  responseContainer: $(".panel--weather"),
  temperatureGradient: $(".temperature-gradient"),
  responseElements: {},
};

elements.responseContainer.querySelectorAll(".value").forEach((span) => {
  const key = span.className.split(" ")[1];
  elements.responseElements[key] = span;
});
