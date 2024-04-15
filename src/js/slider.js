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
    sliderNavigationSelector = ".slider__navigation",
    shortcutsClass = "shortcuts",
    transitionTime = 3000,
  } = {}) {
    this.slider = document.querySelector(sliderSelector);
    this.slideElement = document.querySelector(sliderElementSelector); //This just works if all elements are of the same size!
    this.slides = document.querySelectorAll(`${sliderContainerSelector} ${sliderElementSelector}`).length - 1;
    this.sliderContainer = document.querySelector(sliderContainerSelector);
    this.sliderNavigation = document.querySelector(sliderNavigationSelector);
    this.previousBtn = document.querySelector(previousSelector);
    this.nextBtn = document.querySelector(nextSelector);
    this.shortcutsClass = shortcutsClass;

    this.sliderContainerGapsize = parseInt(window.getComputedStyle(this.sliderContainer).gap, 10);
    this.slideSize = (this.slider.offsetWidth + this.sliderContainerGapsize) / 2;

    this.currentSlide = 0;

    this.setEventListeners();
    this.generateShortcuts();
  }

  refreshGapSize() {
    this.sliderContainerGapsize = parseInt(window.getComputedStyle(this.sliderContainer).gap, 10);
    this.slideSize = (this.slider.offsetWidth + this.sliderContainerGapsize) / 2;
    this.moveSlides();

  }

  moveSlides() {
    this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
    Array.from(this.shortcuts.children).forEach(shortcut => shortcut.classList.remove('active')); //TODO Understand
    this.shortcuts.children[this.currentSlide].classList.add('active');
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
    window.addEventListener('resize', this.refreshGapSize.bind(this));

  }

  generateShortcuts() {
    const shortcuts = document.createElement('div');
    shortcuts.classList.add(this.shortcutsClass);

    for (let i = 0; i < this.slides; i += 1) {
      const singleShortcut = document.createElement('span');
      singleShortcut.addEventListener('click', () => {
        this.currentSlide = i;
        this.moveSlides();
      })
      singleShortcut.classList.add('section--shop-preview__navigation__shortcuts__item');
      shortcuts.appendChild(singleShortcut);
    }
    shortcuts.firstChild.classList.add('active');
    this.sliderNavigation.appendChild(shortcuts);
    this.shortcuts = shortcuts;
  }

}
