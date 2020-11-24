import {getResources} from '../services/services';

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
export default cards;