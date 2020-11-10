"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const
        parentTab = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    //tabs
    function hideContent() {
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show','fade');
        });
        tabs.forEach (tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0){
        tabContent[i].classList.add('show','fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    parentTab.addEventListener('click', (evt) => {
        let target = evt.target;
        // console.log(evt.target);
        // console.log(evt);       
        if(target && target.classList.contains('tabheader__item')){         
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
    hideContent();
    showContent();

    //timer
    const deadline = new Date('2020-11-30');

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

    //setClock('.timer', deadline);

    //modal
    const 
        btnModalShow = document.querySelectorAll('[data-modal]'),
        btnModalClose = document.querySelectorAll('[data-close]'),
        modal = document.querySelector('.modal');
    
    function showModal() {
        //alert('click');
        // if (modal.classList.contains('hide')) {
        //     modal.classList.remove('hide');
        // }
        // modal.classList.add('show');
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    function closeModal() {
        //alert('click');
        modal.classList.toggle('show');
        //modal.classList.remove('show');
        //modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    btnModalShow.forEach( item => {
        item.addEventListener('click', showModal);
    });
    btnModalClose.forEach( item => {
        item.addEventListener('click', closeModal);
    });
    
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // modal open to 25 sec and listed site end
    //const modalTimerId = setTimeout (showModal, 3000);
    
    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
    
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
        
    /*let elemVegy = vegy.makeElem();
    let elemElite = elite.makeElem();
    let elemPost = post.makeElem();
//    console.log(elemVegy);
    let div = document.createElement(elemVegy);
    div.innerHTML = elemVegy;
    menuContainer.append(div);
    //div.innerHTML = */
});
