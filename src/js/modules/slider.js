function slider() {
    
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
            if(offset == parseWidthToNumber(width) * (slides.length-1)){
                offset = 0;
                slideIndex = 1;
            } else {
                offset += parseWidthToNumber(width);
                slideIndex++;
            }
        } else {
            if(offset == 0){
                offset = parseWidthToNumber(width) * (slides.length-1);
                slideIndex = 4;
            } else {
                offset -= parseWidthToNumber(width);
                slideIndex--;
            }
        }
        slideFields.style.transform = `translateX(-${offset}px)`;
    }

    function calculateAndMoveOffsetToMoveByDot (dotIndex) {
        slideIndex = dotIndex;
        offset = parseWidthToNumber(width) * (dotIndex - 1);
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

    function parseWidthToNumber(width){
        return +width.replace(/\D/g, '');
    }


    /*
    //легкая навигация

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
}
 module.exports = slider;