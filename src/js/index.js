// old:

// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

import Slider from './myModule';

new Slider({
    sliderSelector: '.section--shop-preview__wrapper',
    sliderContainerSelector: '.section--shop-preview',
    sliderElementSelector: '.section--shop-preview__product',
    previousSelector: '.section--shop-preview__navigation__previous',
    nextSelector: '.section--shop-preview__navigation__next',
});

//new Slider();