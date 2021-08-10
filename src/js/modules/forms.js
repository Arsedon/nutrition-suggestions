import {openModal, closeModalWindow} from './window';
import {postData} from '../services/service'

function forms(modelTimerId) {

    class FoodRequest {
        constructor(name, phoneNumber) {
            this.name = name;
            this.phoneNumber = phoneNumber;
        }
    }

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так'
    };

    forms.forEach(f => {
        bindPostData(f);
    });

/*    const getData = async (url) => {
        const res = await fetch(url,);
        if(!res.ok){
            new Error(`Could not fetch data from ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    const res = getData('http://localhost:8080/menu')
        .then(data => {
            data.forEach(({img, altImg, title, description, price}) => {
                console.log(img);
                console.log(altImg);
                console.log(title);
                console.log(description);
                console.log(price);
                new Menu(img, altImg, title, description, price).render();
            })
        });
*/

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            const formData = new FormData(form);

            form.insertAdjacentElement('afterend', statusMessage);

            postData('http://localhost:8080/response', formData)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                showThanksModal(message.success);            
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.fail);
            })
            .finally(() => {
                form.reset();
            })

            //создание JSON объекта из FormData объекта
            const jsonObject = {};
            formData.forEach(function(key, value){
                jsonObject[key] = value;
            });
            //или 
            jsonObject = JSON.stringify(Object.fromEntries(formData.entries()));
        })
    }

    function showThanksModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');

        openModal('.modal', modelTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            console.log(document.querySelector('.modal'))

            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            
            closeModalWindow('.modal');
        }, 5000)
    }
}

export default forms;