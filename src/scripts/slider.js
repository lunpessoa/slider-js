import debounce from './debounce';

export default class Slider {
  constructor(slider, wrapper, options) {
    this.slider = document.querySelector(slider);
    this.wrapper = document.querySelector(wrapper);

    this.config = {
      activeClass: 'slider__item--active',
      speed: 1,
      ...options,
      transition: {
        duration: 200,
        function: 'ease-in-out',
        ...options.transition,
      },
    };

    this.distances = {
      startX: 0,
      endX: 0,
      movement: 0,
      moved: 0,
    };

    this.init();
  }

  init() {
    if (!this.slider && !this.wrapper) return this;
    this.changeEvent = new Event('change');
    this.setItemsPositions();
    this.bindEvents();
    this.addSliderEvents();
    this.changeSlide(0);
    return this;
  }

  // Sliders Configuration

  setConfig(options) {
    this.config = {
      ...this.config,
      ...options,
      transition: {
        ...this.config.transition,
        ...options.transition,
      },
    };
    return this;
  }

  updatePosition(clientX) {
    this.distances.movement = (this.distances.startX - clientX) * this.config.speed;
    return this.distances.endX - this.distances.movement;
  }

  transition(bool) {
    const { transition } = this.config;
    this.slider.style.transition = bool
      ? `transform ${transition.duration}ms ${transition.function}`
      : '';
  }

  getItemPosition(item) {
    const margin = (this.wrapper.offsetWidth - item.offsetWidth) / 2;
    return -(item.offsetLeft - margin);
  }

  setItemsPositions() {
    this.items = [...this.slider.children].map((element) => ({
      el: element,
      position: this.getItemPosition(element),
    }));
  }

  moveSlide(distanceX) {
    this.distances.moved = distanceX;
    this.slider.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  sliderIndex(index) {
    const lastIndex = this.items.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === lastIndex ? undefined : index + 1,
    };
  }

  changeActiveClass() {
    const { activeClass } = this.config;
    this.items.forEach((item) => item.el.classList.remove(activeClass));
    this.items[this.index.active].el.classList.add(activeClass);
  }

  changeSlide(index) {
    const item = this.items[index];
    this.moveSlide(item.position);
    this.sliderIndex(index);
    this.distances.endX = item.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  goPrev() {
    if (this.index.prev === undefined) return;
    this.changeSlide(this.index.prev);
  }

  goNext() {
    if (this.index.next === undefined) return;
    this.changeSlide(this.index.next);
  }

  // Event handlers

  bindEvents() {
    this.onResize = debounce(this.onResize.bind(this), 100);

    this.onWheel = debounce(this.onWheel.bind(this));
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);

    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  addSliderEvents() {
    window.addEventListener('resize', this.onResize);

    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('touchend', this.onEnd);
    this.wrapper.addEventListener('wheel', this.onWheel);
  }

  onWheel(event) {
    if (event.wheelDelta < 0 && this.index.next !== undefined) {
      this.goNext();
      return;
    }
    if (event.wheelDelta > 0 && this.index.prev !== undefined) {
      this.goPrev();
      return;
    }
    this.changeSlide(this.index.active);
  }

  onStart(event) {
    event.preventDefault();
    let movetype;
    if (event.type === 'mousedown') {
      this.distances.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.distances.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove);
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
    const position = this.updatePosition(pointerPosition);
    this.moveSlide(position);
    this.wrapper.removeEventListener('wheel', this.onWheel);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.wrapper.addEventListener('wheel', this.onWheel);
    this.distances.endX = this.distances.moved;
    this.transition(true);
    this.changeOnEnd();
  }

  changeOnEnd() {
    if (this.distances.movement >= 120 && this.index.next !== undefined) {
      this.goNext();
      return;
    }
    if (this.distances.movement <= -120 && this.index.prev !== undefined) {
      this.goPrev();
      return;
    }
    this.changeSlide(this.index.active);
  }

  onResize() {
    setTimeout(() => {
      this.setItemsPositions();
      this.changeSlide(this.index.active);
    }, 200);
  }
}
