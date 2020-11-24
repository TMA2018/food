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
export default calc;