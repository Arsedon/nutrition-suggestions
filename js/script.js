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
    const deadLine = new Date();
    deadLine.setDate(deadLine.getDate() + 2);

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
        constructor(img, altImg, title, description, price, parentSelector, ...classes){
            this.img = img;
            this.altImg = altImg;
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
                <img src=${this.img} alt="${this.altImg}">
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
        bindPostData(f);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': "*" 
            }
        });
        return await res.json();
    }

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
    //calculating

    const calculationObj = {
        gender: 'Женщина',
        height: null,
        weight: null,
        age: null,
        activityCoeficient: 1.38,

        calculateCcalNumber() {
            const genderNum = this.gender === 'Мужчина' ? 5 : -161;
            
            return Math.round((this.weight * 10 
                + this.height * 6.25
                + this.age * 5
                + genderNum)
                * this.activityCoeficient);
        }
    }

    const coefficients = {
        'Низкая активность': 1.2,
        'Невысокая активность': 1.38,
        'Умеренная активность': 1.55,
        'Высокая активность': 1.7
    }

    function getGenderFromGenderButtons(){
        return genderButtons
         .filter(btn => btn.className === 'calculating__choose-item calculating__choose-item_active')[0]
         .innerHTML;
     }
 
     function getActivityCoefficientFromCalcButtons(){
         const buttonKey = calculatingChooseButtonsArr
             .filter(btn => btn.className === 'calculating__choose-item calculating__choose-item_active')[0]
             .innerHTML;
        return coefficients[buttonKey];
     }

    const calculatingField = document.querySelector('.calculating__field'),
          genderButtons = Array.from(document.getElementById('gender').getElementsByClassName('calculating__choose-item')),
          calculatingChooseButtonsArr = Array.from(document.getElementsByClassName('calculating__choose calculating__choose_big')[0].children),
          conditionInputs = document.getElementsByClassName('calculating__choose calculating__choose_medium')[0],
          resultCcal = document.getElementById('ccal');
    
    function switchActivityOfCalculatingChooseButtons(btn, buttonArr){
        buttonArr.forEach(b => {
            if(b.className === 'calculating__choose-item calculating__choose-item_active'){
                b.className = 'calculating__choose-item';
                }
            btn.className = 'calculating__choose-item calculating__choose-item_active';
        });
    }

    function getResultCcal(){
        resultCcal.textContent = calculationObj.calculateCcalNumber() > 0
        ? calculationObj.calculateCcalNumber()
        : 0; 
    }

    calculatingField.addEventListener('click', (event) => {
        if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose'){
            switchActivityOfCalculatingChooseButtons(event.target, genderButtons);
            calculationObj.gender = getGenderFromGenderButtons();

        } else if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose calculating__choose_big'){
            switchActivityOfCalculatingChooseButtons(event.target, calculatingChooseButtonsArr);
            calculationObj.activityCoeficient = getActivityCoefficientFromCalcButtons();

        } else if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose calculating__choose_medium'){
            conditionInputs.addEventListener('input', (event) => {
                calculationObj.calculateCcalNumber(); 
                if(event.target.getAttribute('id') === 'height'){
                    calculationObj.height = event.target.value;                    
                } else if (event.target.getAttribute('id') === 'age'){
                    calculationObj.age = event.target.value;
                } else if (event.target.getAttribute('id') === 'weight'){
                    calculationObj.weight = event.target.value;
                } 
                getResultCcal();
            });
        }
        getResultCcal();
    });
    
    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider')
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideFields = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slideFields.style.width = 100 * slides.length + '%';
    slideFields.style.display = 'flex';
    slideFields.style.transition = '0.5s all'

    slideWrapper.style.overflow = 'hidden';
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-index', i + 1);

    indicators.append(dot);
    dots.push(dot);
    setActivityOfSliderDot();
    }

    function setActivityOfSliderDot(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    slider.append(indicators);

    slides.forEach(slide => {
        slide.style.width = width;
    });

    checkNumberOfSlidesPresenting();
    presentNumberOfSlide(slideIndex)

    next.addEventListener('click', () => {
        changeOffsetByButton(true)
        presentNumberOfSlide(slideIndex);
        setActivityOfSliderDot();
    })

    prev.addEventListener('click', () => {
        changeOffsetByButton(false);
        presentNumberOfSlide(slideIndex);
        setActivityOfSliderDot();
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            calculateAndMoveOffsetToMoveByDot(e.target.getAttribute('data-slide-index'));
            presentNumberOfSlide(slideIndex);
            setActivityOfSliderDot();
        })
    });

    function changeOffsetByButton(isNext){
        if(isNext){
            if(offset == +width.slice(0, width.length - 2) * (slides.length-1)){
                offset = 0;
                slideIndex = 1;
            } else {
                offset += +width.slice(0, width.length - 2);
                slideIndex++;
            }
        } else {
            if(offset == 0){
                offset = +width.slice(0, width.length - 2) * (slides.length-1);
                slideIndex = 4;
            } else {
                offset -= +width.slice(0, width.length - 2);
                slideIndex--;
            }
        }
        slideFields.style.transform = `translateX(-${offset}px)`;
    }

    function calculateAndMoveOffsetToMoveByDot (dotIndex) {
        slideIndex = dotIndex;
        offset = +width.slice(0, width.length - 2) * (dotIndex - 1);
        slideFields.style.transform = `translateX(-${offset}px)`;
    }
    
    function checkNumberOfSlidesPresenting(){
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }

    function presentNumberOfSlide(slideIndex){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`
        } else current.textContent = slideIndex;
    }


/*
    showCurrentSlide(slideIndex);
    checkNumberOfSlidesPresenting();


    function showCurrentSlide(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => hideSlide(item));

        showSlide(slides[slideIndex - 1]);
        presentNumberOfSlide(slideIndex);
    }

    function plusSlides (n) {
        showCurrentSlide(slideIndex += n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    function hideSlide(slide){
        slide.classList.remove('show');
        slide.classList.add('hide');
    }

    function showSlide(slide){
        slide.classList.remove('hide');
        slide.classList.add('show');
    }

    function checkNumberOfSlidesPresenting(){
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }

    function presentNumberOfSlide(slideIndex){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`
        } else current.textContent = slideIndex;
    }
*/
});