import SliderNav from '@/scripts/slider-nav';

import '@/styles/index.css';

import body from './index.html';

const contentBody = document.createElement('div');
contentBody.innerHTML = body;

document.body.innerHTML = contentBody.innerHTML;

document.documentElement.className += ' js';

const slider = new SliderNav('[data-slider="content"]', '[data-slider="wrapper"]', {
  controlers: {
    prev: '.controler--prev',
    next: '.controler--next',
  },
  indicators: { el: '.slider__control', activeClass: 'c-control__item--active' },
  transition: {
    duration: 500,
    function: 'ease-in',
  },
});

slider.addIndicators(true);
slider.setConfig({ speed: 1.5 });
