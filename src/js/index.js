import Slider from "./slider";
import stylePage from "./styling/styles.js";
import generateContactForm from "./forms/contact.js";

// TODO: add Slider only on these pages with an actual slider!
const currentSubPage = window.location.pathname;
stylePage();

switch (currentSubPage) {
  case "/sub-page/contact.html":
    generateContactForm();
    break;
}

if (document.querySelector(".section--shop-preview")) {
  new Slider({
    sliderSelector: ".section--shop-preview__wrapper",
    sliderContainerSelector: ".section--shop-preview",
    sliderElementSelector: ".section--shop-preview__product",
    previousSelector: ".section--shop-preview__navigation__previous",
    nextSelector: ".section--shop-preview__navigation__next",

    sliderNavigationSelector: ".section--shop-preview__navigation",

    shortcutsClass: "section--shop-preview__navigation__shortcuts",
  });
}
