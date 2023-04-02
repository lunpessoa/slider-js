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
    this.slidersConfig();
    this.bindEvents();
    this.addSliderEvents();
    return this;
  }

  moveSlide(distanceX) {
    this.distances.moved = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distances.movement = (this.distances.startX - clientX) * 1.5;
    return this.distances.endX - this.distances.movement;
  }

  // Event handlers

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  addSliderEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.distances.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.distances.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
    const position = this.updatePosition(pointerPosition);
    this.moveSlide(position);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.distances.endX = this.distances.moved;
  }

  // Sliders Configuration
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidersConfig() {
    this.items = [...this.slide.children].map((element) => ({
      el: element,
      position: this.slidePosition(element),
    }));
  }

  slidesIndexNav(index) {
    const lastIndex = this.items.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === lastIndex ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.items[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.distances.endX = activeSlide.position;
  }
}
