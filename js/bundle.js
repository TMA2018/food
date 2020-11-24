/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    //calc
    const
        calculatingField = document.querySelector('.calculating__field'),
        resCalc = calculatingField.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    
    sex = localStorage.getItem('sex') ? localStorage.getItem('sex'): 'female';
    localStorage.setItem('sex', sex);
    ratio =  localStorage.getItem('ratio') ? localStorage.getItem('ratio'): 1.375;
    localStorage.setItem('ratio', ratio);
    function initLocalSettings (selector, activeClass) {
        const elems = document.querySelectorAll(selector);

        elems.forEach( elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

/*
        male = calculatingField.querySelector('#male'),
        female = calculatingField.querySelector('#female'),
        height = calculatingField.querySelector('#height'),
        weight = calculatingField.querySelector('#weight'),
        age = calculatingField.querySelector('#age');
*/
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            resCalc.textContent = 'Write all parameters';
            return;
        }
        if (sex == 'male') {
            resCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            resCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elems = document.querySelectorAll(selector);
        elems.forEach (elem => {
            elem.addEventListener('click', (evt) => {
                if (evt.target.getAttribute('data-ratio')) {
                    ratio = +evt.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',ratio);
                } else {
                    sex = evt.target.getAttribute('id');
                    localStorage.setItem('sex',sex);
                }
                elems.forEach (elem => {
                    elem.classList.remove(activeClass);
                });
                evt.target.classList.add(activeClass);
                //console.log (ratio,sex,weight,age,height);
                calcTotal();
            });
        });
        //document.querySelector(parentSelector).
    }
    getStaticInfo('#gender div','calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big  div','calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', (evt) => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;                
            }
            calcTotal();
        });
    }
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}
//module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    
    //вывод меню на классах 
    const 
        menuContainer = document.querySelector('.menu__field .container');

    menuContainer.innerHTML = '';

    class MenuItem {
        constructor (src, alt, subtitle, descr, total, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 50;
            this.changeToEu();
        }

        changeToEu() {
            this.total /= this.transfer; 
        }

        render() {
            let elem = document.createElement('div');
            if (this.classes.length === 0) {
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => {
                    elem.classList.add(className);
                });
            }
            elem.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> руб/день</div>
                </div>
                `; 
            this.parent.append(elem);
    } 
    /* //надо было создавать элем, вставлять html и вставлять в menuContainer
    makeElem() {
        return (`<div class="menu__item">
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.total}</span> руб/день</div>
        </div>
    </div>`);
    }*/
    }
/* go to sercices --> services.js
    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} status is ${res.status}`);
        }

        return await res.json();
    };
*/
    //меню с сервера - массив + его перебор
    /*getResources('http://localhost:3000/menu')
    .then( data => {
        data.forEach(({src, alt, subtitle, descr, total}) => {//деструктуризация объекта
            new MenuItem(src, alt, subtitle, descr, total, '.menu .container').render();
        });
    });
    перепишем на axios*/
    axios.get('http://localhost:3000/menu')
    .then( data => {
        data.data.forEach(({src, alt, subtitle, descr, total}) => {//деструктуризация объекта
            new MenuItem(src, alt, subtitle, descr, total, '.menu .container').render();
        });
    });
    /*переделали на функцию getResources работу с сервером     
    const 
    vegy = new MenuItem(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        229,
        '.menu__field .container'
    ),
    elite = new MenuItem('img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        550,
        '.menu__field .container'
    ),
    post = new MenuItem('img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        430,
        '.menu__field .container'
    );

    vegy.render();
    elite.render();
    post.render();
    */
    /*let elemVegy = vegy.makeElem();
    let elemElite = elite.makeElem();
    let elemPost = post.makeElem();
    //    console.log(elemVegy);
    let div = document.createElement(elemVegy);
    div.innerHTML = elemVegy;
    menuContainer.append(div);
    //div.innerHTML = */
}
//module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
//forms


//import {closeModal} from 'modal';
function forms(formSelector, modalTimerId) {
    const 
        //forms = document.querySelectorAll('form'),
        forms = document.querySelectorAll(formSelector),
        message = {
            loading: "img/forms-modal/spinner.svg",
            success: 'мы с вами свяжемся в ближайшее время',
            failure: "ошибка, повторите попытку"
        };

        forms.forEach(form => {
        bindPostData(form);
    });
/* go to services --> services.js
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json' //закоммент так как отправляем не json 
            },
            //body: formData //т.к. мы еще неумеем возвращать json
            body: data //если JSON то так
        });
        return await res.json();
    };
*/
    function bindPostData(form) {
        form.addEventListener('submit',(evt) => {
            evt.preventDefault();
            let formData = new FormData(form);
            //add spinner whithout text
            //const statusMessage = document.createElement('div');
            //statusMessage.textContent = message.loading;
            const statusMessage = document.createElement('img');          
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; //best to css.

            //чтобы спиннер был в центре однотипно вместо form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
        /*используем fetch вместо HTTP Request
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); 
            и ниже вместо request.addEventListener('load', () => { идет then(/// */
            
        /*если используется XMLHttpRequest и form-data то заголовок устанавливать не нужно,
        он устанавливается автоматически
            request.setRequestHeader('Content-type', 'multipart/form-data');
        а для json нужен ужезаголовок
        */

            //request.setRequestHeader('Content-type', 'application/json');
        //тоже для json
        /*т.к. отправляем formData То это не надо: */
            /*const obj = {};

            formData.forEach( function(value, key){
                obj[key] = value;
            });
            заменяем на: */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            /* вынесли в функцию.
            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json' //закоммент так как отправляем не json 
                },
                //body: formData //т.к. мы еще неумеем возвращать json
                body: JSON.stringify(obj) //если JSON то так
            })*/
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
            //.then( data => data.text()) не нужно трансформировать, так как она идет в ф-и
            .then(data => {
                console.log(data); //data данные которые возвращает сервер
                showThanksModal(message.success);
                statusMessage.remove(); //delete spinner
            }).catch( () => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
            /*const json = JSON.stringify(obj);
            request.send(json);*/

            // for data form --> request.send(formData);
        /*
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    //вместо statusMessage.textContent = message.success; исп ф-ю
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove(); //delete spinner
                } else {
                    //вместо textContent = message.failure; исп ф-юstatusMessage.
                    showThanksModal(message.failure);
                }
            });*/
        });
    }

    function showThanksModal (message) {
    //can we hide last dualog and show new dialog
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>    
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout( () => {
            thanksModal.remove();
            //prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 1000);
    }
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "showModal": () => /* binding */ showModal
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    //if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    //}
    modal.classList.add('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) { clearInterval(modalTimerId); }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    //modal.classList.toggle('show');
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal
    const 
        //btnModalShow = document.querySelectorAll('[data-modal]'),
        btnModalShow = document.querySelectorAll(triggerSelector),
    //1 делегируем событие, чтобы учитывались и динамические кнопки и вместо
    //btnModalClose = document.querySelectorAll('[data-close]'), используем проверку свойства
    //а не навешиваем обработкчик на кнопку Close

    //modal = document.querySelector('.modal');
        modal = document.querySelector(modalSelector);
    btnModalShow.forEach( item => {
        item.addEventListener('click', () => showModal(modalSelector, modalTimerId)); //обход вызова ф-и с параметром
    });
    /*1/ вместо этого добавим проверку в modal.addEventListener
    evt.target.getAtribute('data-close') == ''
    btnModalClose.forEach( item => {
    item.addEventListener('click', closeModal);
    });
    */
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
            //console.log(evt.target.getAttribute('data-close'));
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // modal open to 25 sec and listed site end
    //const modalTimerId = setTimeout (showModal, 50000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, currentSlide, totalSlides, nextSlideBtn, prevSlideBtn}) {
//slider
    /*const
        Slider = document.querySelector('.offer__slider'),
        prev = Slider.querySelector('.offer__slider-prev'),
        next = Slider.querySelector('.offer__slider-next'),
        offerSlide = Slider.querySelectorAll('.offer__slide'),
        current = Slider.querySelector('#curnpxrent'),
        total = Slider.querySelector('#total');*/
    const
        Slider1 = document.querySelector(container),
        //Slider = document.querySelector('.offer__slider'),
        prev = Slider1.querySelector(prevSlideBtn),
        next = Slider1.querySelector(nextSlideBtn),
        offerSlide = Slider1.querySelectorAll(slide),
        current = Slider1.querySelector(currentSlide),
        total = Slider1.querySelector(totalSlides);
    //console.log(parseInt(current.textContent));
    //let offerSlideArray =[];
    current.textContent ='01';
    let cur = parseInt(current.textContent);
    offerSlide.forEach( (item, i) => {
        if (i != cur-1) {
            item.classList.add('hide');
            //item.classList.remove('show');
        }
        //offerSlideArray.push(item);
        });
        //let numTotal = offerSlide.length;
        let numTotal = offerSlide.length;
        //console.log(offerSlideArray);
        if (numTotal < 10 ) {
            total.textContent = `0${numTotal}`;
        } else {
            total.textContent = numTotal;
        }

    Slider1.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    Slider1.append(indicators);

    for (let i = 0; i < numTotal; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i==0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function prevSlide() {
        let cur = parseInt(current.textContent);

        cur = (cur-1 < 1) ? numTotal : cur-1;

        if (cur < 10) {
            current.textContent = `0${cur}`;
        } else {
            current.textContent = cur;
        }
        showSlide (cur);
        viewActiveDot(cur);
    }

    function nextSlide() {
        let cur = parseInt(current.textContent);

        cur = (cur+1 > numTotal) ? 1 : cur+1;

        if (cur < 10) {
            current.textContent = `0${cur}`;
        } else {
            current.textContent = cur;
        }
        showSlide (cur);
        viewActiveDot(cur);
    }

    function showSlide (numSlide) {
    offerSlide.forEach( (item, i) => {
            if (i == numSlide-1) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.add('hide');
                item.classList.remove('show');
            }
        });
    }

    function viewActiveDot(numDot){
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[numDot-1].style.opacity = 1;
        }

        prev.addEventListener('click',prevSlide);
        next.addEventListener('click',nextSlide);

        dots.forEach (dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');
        //console.log(slideTo);
            cur = slideTo;
            offerSlide.forEach( (item, i) => {
                if (i == cur-1) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
            dots.forEach(dot => {
                dot.style.opacity = '0.5';
            });
            dots[cur-1].style.opacity = 1;
            if (cur < 10) {
                current.textContent = `0${cur}`;
            } else {
                current.textContent = cur;
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(parentTabSelector, tabsSelector, tabContentSelector, activeTabSelector) {
    const
        /*parentTab = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');*/
        parentTab = document.querySelector(parentTabSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

    //tabs
    function hideContent() {
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show','fade');
        });
        tabs.forEach (tab => {
            //tab.classList.remove('tabheader__item_active');
            tab.classList.remove(activeTabSelector);
        });
    }

    function showContent(i = 0){
        tabContent[i].classList.add('show','fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeTabSelector);
    }

    parentTab.addEventListener('click', (evt) => {
        let target = evt.target;
        // console.log(evt.target);
        // console.log(evt);       
        if(target && target.classList.contains(tabsSelector.slice(1))){         
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
    //hideContent();
    //showContent();
    hideContent();
    showContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline){
    //timer
    //const deadline = new Date('2020-11-30');

    function getTimeRemaining(endtime) {
        const 
            t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 / 60)) % 60),
            sec = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'sec': sec
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const 
            timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            sec = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            sec.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout (() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimerId), 50000);
    const deadline = new Date('2020-11-30');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__.default)('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', deadline);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        container: '.offer__slider',
        currentSlide: '#current',
        totalSlides: '#total',
        nextSlideBtn: '.offer__slider-next',
        prevSlideBtn: '.offer__slider-prev',
        slide: '.offer__slide'
    });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getResources [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResources": () => /* binding */ getResources
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json' //закоммент так как отправляем не json 
        },
        //body: formData //т.к. мы еще неумеем возвращать json
        body: data //если JSON то так
    });
    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url} status is ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map