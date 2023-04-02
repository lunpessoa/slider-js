import Slider from '@/scripts/slider';

import '@/styles/index.css';

import body from './index.html';

const contentBody = document.createElement('div');
contentBody.innerHTML = body;

document.body.innerHTML = contentBody.innerHTML;

document.documentElement.className += ' js';

const slider = new Slider('[data-slider="content"]', '[data-slider="wrapper"]');
slider.init();

slider.changeSlide(5);
