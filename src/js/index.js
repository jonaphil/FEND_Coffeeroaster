// old:

// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

import Slider from './Slider';
// import {Shop, Product} from './Shop';

new Slider({
    sliderSelector: '.section--shop-preview__wrapper',
    sliderContainerSelector: '.section--shop-preview',
    sliderElementSelector: '.section--shop-preview__product',
    previousSelector: '.section--shop-preview__navigation__previous',
    nextSelector: '.section--shop-preview__navigation__next',
    
    sliderNavigationSelector: ".section--shop-preview__navigation",

    shortcutsClass: 'section--shop-preview__navigation__shortcuts',
});

// // Shop:
// new Shop({
//     shopSelector: ".section__shop",
//     productSelector: ".section__shop__product",
// });

