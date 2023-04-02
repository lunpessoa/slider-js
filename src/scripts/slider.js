export default class Slider {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distances = {
      startX: 0,
      endX: 0,
      movement: 0,
      moved: 0,
    };
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

  moveSlide(distanceX) {
    this.distances.moved = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distances.movement = (this.distances.startX - clientX) * 1.5;
    return this.distances.endX - this.distances.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.distances.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    event.preventDefault();
    const position = this.updatePosition(event.clientX);
    this.moveSlide(position);
  }

  onEnd(event) {
    event.preventDefault();
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.distances.endX = this.distances.moved;
  }
}
