import Slider from './slider';

export default class SliderNav extends Slider {
  constructor(slider, wrapper, options) {
    super(slider, wrapper, options);

    this.config = {
      indicators: false,
      controlers: false,
      ...options,
      ...this.config,
    };
  }

  init() {
    super.init();
    this.indicators = [];
    if (this.config.controlers) {
      this.addArrows(this.config.controlers?.prev, this.config.controlers?.next);
    }
    if (this.config.indicators) {
      this.addIndicators(this.config.indicators);
    }
  }

  // Add Arrows Configurations

  addArrows(prev, next) {
    if (
      !(prev instanceof HTMLElement && next instanceof HTMLElement) &&
      !(typeof prev === 'string' && typeof next === 'string')
    ) {
      console.error(`Invalid: prev and next elements. Elements must be HTMLElement or String type`);
      return;
    }
    this.controlers = {
      prev: prev instanceof HTMLElement ? prev : document.querySelector(prev),
      next: next instanceof HTMLElement ? next : document.querySelector(next),
    };
    this.transition(true);
    this.addArrowsEvent();
  }

  addArrowsEvent() {
    this.controlers.prev.addEventListener('click', this.goPrev);
    this.controlers.next.addEventListener('click', this.goNext);
  }

  // Add Indicators Configurations

  addIndicators(indicators) {
    if (Array.isArray(indicators) && indicators.length > 0) {
      indicators.forEach((indicator) => this.putIndicator(indicator?.el, indicator?.activeClass));
    } else if (indicators) {
      this.putIndicator(indicators?.el, indicators?.activeClass);
    }
  }

  putIndicator(indicators, activeClass = 'indicators__item--active') {
    if (indicators && !(indicators instanceof HTMLElement) && typeof indicators !== 'string') {
      console.error(`Invalid: indicators element. Element must be HTMLElement or String type`);
      return;
    }

    const indicatorsObj = {
      el:
        indicators instanceof HTMLElement
          ? indicators
          : document.querySelector(indicators) || this.createDefaultIndicators(),
      activeClass,
    };

    indicatorsObj.items = [...indicatorsObj.el.children];

    this.indicators.push(indicatorsObj);
    this.activeIndicator();

    indicatorsObj.items.forEach((item, index) => this.eventIndicator(item, index));
  }

  createDefaultIndicators() {
    const indicators = document.createElement('ul');
    indicators.dataset.slider = 'indicators';
    this.items.forEach((item, index) => {
      indicators.innerHTML += `<li class="indicators__item"><a href="#slide-${index}">${
        index + 1
      }</a></li>`;
    });
    this.slider.insertAdjacentElement('afterend', indicators);
    return indicators;
  }

  activeIndicator() {
    this.indicators.forEach((indicator) => {
      indicator.items.forEach((item) => item.classList.remove(indicator.activeClass));
      indicator.items[this.index.active].classList.add(indicator.activeClass);
    });
  }

  eventIndicator(item, index) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('change', () => this.activeIndicator());
  }
}
