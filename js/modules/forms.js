//forms
import {closeModal, showModal} from './modal';
import {postData} from '../services/services'
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
            postData('http://localhost:3000/requests',json)
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
        showModal('.modal', modalTimerId);
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
            closeModal('.modal');
        }, 1000);
    }
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}
export default forms;