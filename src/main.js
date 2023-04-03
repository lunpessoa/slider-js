import SliderNav from '@/scripts/slider-nav';

import '@/styles/index.css';

import body from './index.html';

const contentBody = document.createElement('div');
contentBody.innerHTML = body;

document.body.innerHTML = contentBody.innerHTML;

document.documentElement.className += ' js';

const slide = new SliderNav('[data-slider="content"]', '[data-slider="wrapper"]');
slide.init();
slide.addArrow('.arrows__prev', '.arrows__next');
slide.addControl('.slider__control', 'c-control__item--active');
