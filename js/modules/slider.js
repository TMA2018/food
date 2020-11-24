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

export default slider;