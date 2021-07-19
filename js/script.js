window.addEventListener('DOMContentLoaded', function() {

	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    console.log(tabs);
    console.log(tabsContent);
    console.log(tabsParent);

    //Timer
    const deadLine = '2021-07-15';

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor( (t/(1000*60*60*24)) ),
              hours = Math.floor( (t/(1000*60*60) % 24) ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              seconds = Math.floor( (t/1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function checkNumForZeroAdding(num){
            if(num >= 0 && num < 10){
                return `0${num}`;
            }else {
                return num;
            }
        }
    
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = checkNumForZeroAdding(t.days);
            hours.innerHTML = checkNumForZeroAdding(t.hours);
            minutes.innerHTML = checkNumForZeroAdding(t.minutes);
            seconds.innerHTML = checkNumForZeroAdding(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modelTimerId);
    }

    function closeModalWindow(){
        modal.classList.remove('show');
        modal.classList.add('hide');

        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModalWindow();
        }
    });

    const modelTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //Меню с карточками

    class Menu {
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.imgSrc = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.currencyValue = 74; 
            this.convertationCurrency();
            this.parent = document.querySelector(parentSelector); 
            this.classes = classes;    
        }

        convertationCurrency(){
            this.price = this.price * this.currencyValue;
        }

        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.imgSrc} alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`
            ;
            this.parent.append(element);
        }
    }
    
    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        24,
        '.menu .container'
    ).render();

    new Menu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container'
    ).render();

    //Forms 

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
        postData(f);
    });

    function postData(form){
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

            fetch('http://localhost:8080/response', {
                method: 'POST',
                body: formData,
                headers: {
                    'Access-Control-Allow-Origin': "*" 
                }
            })
            .then(data => data.json())
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
            })
        })
    }

    function showThanksModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');

        openModal();

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

            openModal();
        }, 1000)
    }
});