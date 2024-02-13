// old:

// const myFunction = () => console.log("hello world");

// export const multiply = (value1, value2) => {
//   return value1 * value2;
// };

// export default myFunction;

export default class Slider {
    constructor({
        sliderSelector = ".slider",
        sliderContainerSelector = ".slider__container",
        sliderElementSelector = ".slider__element",
        previousSelector = ".previous",
        nextSelector = ".next",
        transitionTime = 3000,
    } = {}) {
        this.slider = document.querySelector(sliderSelector);
        this.slideElement = document.querySelector(sliderElementSelector); //This just works if all elements are of the same size!
        this.slides = document.querySelectorAll(`${sliderContainerSelector} ${sliderElementSelector}`).length - 1;
        this.sliderContainer = document.querySelector(sliderContainerSelector);
        this.previousBtn = document.querySelector(previousSelector);
        this.nextBtn = document.querySelector(nextSelector);
        console.log(this);

        this.sliderContainerGapsize = parseInt(window.getComputedStyle(this.sliderContainer).gap, 10);
        this.slideSize = (this.slider.offsetWidth + this.sliderContainerGapsize) / 2;
        this.currentSlide = 0;
        this.setEventListeners();
        
    }

    moveSlides() {
        this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
    }

    nextSlide() {
        this.currentSlide = this.currentSlide >= this.slides - 1 ? 0 : this.currentSlide + 1;
        this.moveSlides();
    }

    previousSlide() {
        this.currentSlide = this.currentSlide <= 0 ? this.slides - 1 : this.currentSlide - 1;
        this.moveSlides();
    }

    setEventListeners() {
        this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
        this.previousBtn.addEventListener('click', this.previousSlide.bind(this));
    }

}