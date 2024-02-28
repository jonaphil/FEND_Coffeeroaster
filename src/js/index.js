import Slider from './slider';

// TODO: add Slider only on these pages with an actual slider!
new Slider({
    sliderSelector: '.section--shop-preview__wrapper',
    sliderContainerSelector: '.section--shop-preview',
    sliderElementSelector: '.section--shop-preview__product',
    previousSelector: '.section--shop-preview__navigation__previous',
    nextSelector: '.section--shop-preview__navigation__next',
    
    sliderNavigationSelector: ".section--shop-preview__navigation",

    shortcutsClass: 'section--shop-preview__navigation__shortcuts',
});

