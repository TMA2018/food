"use strict";

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout (() => showModal('.modal', modalTimerId), 50000);
    const deadline = new Date('2020-11-30');
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer('.timer', deadline);
    slider({
        container: '.offer__slider',
        currentSlide: '#current',
        totalSlides: '#total',
        nextSlideBtn: '.offer__slider-next',
        prevSlideBtn: '.offer__slider-prev',
        slide: '.offer__slide'
    });
});