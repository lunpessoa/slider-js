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

  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slider';
    this.items.forEach((item, index) => {
      control.innerHTML += `<li class="control__item"><a href="#slide-${index}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  activeControl() {
    this.paginations.forEach((item) => item.classList.remove(this.controlClass));
    this.paginations[this.index.active].classList.add(this.controlClass);
  }

  addControl(control, controlClass) {
    this.control = document.querySelector(control) || this.createControl();
    this.controlClass = controlClass !== undefined ? controlClass : 'control__item--active';
    this.paginations = [...this.control.children];
    this.activeControl();
    this.paginations.forEach((item, index) => this.eventControl(item, index));
  }

  eventControl(item, index) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('change', () => this.activeControl());
  }
}
