import Slider from './slider';

export default class SliderNav extends Slider {
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.transition(true);
    this.addArrowsEvent();
  }

  addArrowsEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide);
    this.nextElement.addEventListener('click', this.activeNextSlide);
  }
}
