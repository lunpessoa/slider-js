export default class Slider {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  init() {
    if (!this.slide && !this.wrapper) return this;
    this.bindEvents();
    this.addSliderEvents();
    return this;
  }

  addSliderEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onEnd(event) {
    event.preventDefault();
    this.wrapper.removeEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    event.preventDefault();
    return this;
  }
}
