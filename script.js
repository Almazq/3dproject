const btnsliderPrev = document.querySelector('.btn-slider.prev');
const btnsliderNext = document.querySelector('.btn-slider.next');

const sliderItem = document.querySelectorAll('.slider-item');


if(innerWidth < 700) {
    
    document.querySelector('#vid').children[0].src = "ссылка на видео" // лучше конечно на .mov было

} 
let mouseElem = true;
let navState = false;

// video autoplay
document.getElementById('vid').play();


btnsliderPrev.addEventListener('click' ,()=>{
    let current = sliderItem[0].style.transform.replace(/[^\d;]/g, '');
    if(current == "0" || current.length == "0"){
        null;
    }else{
        sliderItem.forEach((elem)=>{
            if(innerWidth < 750){
                elem.style.transform = `translateX(${-current + 209}%)`;
    
            }else{
                elem.style.transform = `translateX(${-current + 353}%)`;

            }
        })
    }
})

btnsliderNext.addEventListener('click' ,()=>{
    let max;
    if(innerWidth < 750){
        max = Math. ceil((sliderItem.length - 2) / 2) * 209;

    }else{
        max = ((sliderItem.length - 3) / 3) *  353;

    }
    let current = sliderItem[0].style.transform.replace(/[^\d;]/g, '');
    current = current == '' ? 0 : current;
    if(current != max ){
        sliderItem.forEach((elem)=>{
            if(innerWidth < 750){
            elem.style.transform = `translateX(-${+current + 209}%)`;

            }else{
            elem.style.transform = `translateX(-${+current + 353}%)`;
                
            }
        })
    }
})

if(innerWidth > 750 ){
    // scroll 
    let stateObserver = 0;
    let currentMainBlock = 0;
    let stateAnim = true; 
    const mainBlock = document.querySelectorAll('.mainblock');
    document.querySelectorAll('.scroll-blocks').forEach(element=>{
        element.addEventListener("mouseover", ()=>{
            mouseElem = false;
        })
        element.addEventListener("mouseout", ()=>{
            mouseElem = true;
        })
    })

    // Функция скролла

    mainBlock.forEach(elem=>{
        elem.addEventListener('wheel', function(event) {
            // скролл вниз

            if(event.deltaY > 20 && stateAnim && mouseElem && currentMainBlock != 5){
                currentMainBlock++;
                mainBlock.forEach(element=>{
                    element.classList.remove("showMainBlock");
                    element.classList.remove("baclist");
                    element.classList.remove("bottom-baclist");
                    element.classList.remove("bottom-showblock");
                    stateAnim = false;

                })
                mainBlock[currentMainBlock-1].classList.add("baclist");
                mainBlock[currentMainBlock].classList.remove("hiddenMainBlock")
                mainBlock[currentMainBlock].classList.add("showMainBlock")
                setTimeout(()=>{
                mainBlock[currentMainBlock-1].classList.remove("baclist");
                    mainBlock[currentMainBlock-1].classList.add("hiddenMainBlock");
                    stateAnim = true;

                },1000)

            }
            // скролл верх
            if(event.deltaY < -20 && currentMainBlock != 0 && stateAnim && mouseElem &&  currentMainBlock != 5){
                if(navState){
                    currentMainBlock = 0;
                    navState = false;
                }else{
                    currentMainBlock--;
                }
                mainBlock.forEach(element=>{
                    element.classList.remove("showMainBlock");
                    element.classList.remove("baclist");
                    element.classList.remove("bottom-baclist");
                    element.classList.remove("bottom-showblock");
                    stateAnim = false;

                })
                mainBlock[currentMainBlock+1].classList.add("bottom-baclist");
                mainBlock[currentMainBlock].classList.remove("hiddenMainBlock")
                mainBlock[currentMainBlock].classList.add("bottom-showblock")
                setTimeout(()=>{
                    mainBlock[currentMainBlock+1].classList.remove("bottom-baclist");
                    mainBlock[currentMainBlock+1].classList.add("hiddenMainBlock");

                    stateAnim = true;
                },1000)
            }
        })
    })

    const info = document.querySelector(".info");
    const aboutContent = document.querySelector('.about-txt-blocks');
    const contactsBlock = document.querySelector('.contacts-block')
    let infoScrollState = 0;


    function scrollUp(id , idPlus){
        mainBlock.forEach(element=>{
            element.classList.remove("showMainBlock");
            element.classList.remove("baclist");
            element.classList.remove("bottom-baclist");
            element.classList.remove("bottom-showblock");
            stateAnim = false;

        })
        mainBlock[idPlus].classList.add("bottom-baclist");
        mainBlock[id].classList.remove("hiddenMainBlock")
        mainBlock[id].classList.add("bottom-showblock")
        setTimeout(()=>{
            mainBlock[idPlus].classList.remove("bottom-baclist");
            mainBlock[idPlus].classList.add("hiddenMainBlock");

            stateAnim = true;
        },1200)
    }

    info.addEventListener('wheel', function(event) {
        infoScrollState = event.deltaY;
        
        if(info.scrollTop == 0 && event.deltaY < -20 && stateAnim){
            if(navState){
                currentMainBlock = 0;
                navState = false;
                scrollUp(currentMainBlock , 2);
            }else{
                currentMainBlock--;
                scrollUp(currentMainBlock , currentMainBlock+1);
            }
        }

    })

    aboutContent.addEventListener('wheel', function(event) {
        infoScrollState = event.deltaY;
        if(aboutContent.scrollTop == 0 && event.deltaY < -20 && stateAnim){
            if(navState){
                currentMainBlock = 0;
                navState = false;
                scrollUp(currentMainBlock , 4);
            }else{
                currentMainBlock--;
                scrollUp(currentMainBlock , currentMainBlock+1);
            }
            
        }

    })
    contactsBlock.addEventListener('wheel', function(event) {
        if(contactsBlock.scrollTop == 0 && event.deltaY < -20 && stateAnim){
            // currentMainBlock--;
            if(navState){
                currentMainBlock = 0;
                navState = false;
                scrollUp(currentMainBlock , 5);
            }else{
                currentMainBlock--;
                scrollUp(currentMainBlock , currentMainBlock+1);
            }
            
            
        }

    })


    window.onload = () => {
        const options = {
            threshold : 1.0
        }
        const callback = function(entries , observer) {
            entries.forEach( entry =>{
                if(stateObserver == 1 && stateAnim && !mouseElem && currentMainBlock != 5 && infoScrollState > 30 ){

                    currentMainBlock++;
                    mainBlock.forEach(element=>{
                        element.classList.remove("showMainBlock");
                        element.classList.remove("baclist");
                        element.classList.remove("bottom-baclist");
                        element.classList.remove("bottom-showblock");
                        stateAnim = false;
        
                    })
                    mainBlock[currentMainBlock-1].classList.add("baclist");
                    mainBlock[currentMainBlock].classList.contains("hiddenMainBlock") ? mainBlock[currentMainBlock].classList.remove("hiddenMainBlock") : null;
                    mainBlock[currentMainBlock].classList.add("showMainBlock")
                    setTimeout(()=>{
                    mainBlock[currentMainBlock-1].classList.remove("baclist");
                        mainBlock[currentMainBlock-1].classList.add("hiddenMainBlock");
                        stateAnim = true;
        
                    },1200)
        
                }
                stateObserver = 1;

            })
        }
        const observer = new IntersectionObserver( callback , options)
        const target = document.querySelector('.lastPoint');
        const targew = document.querySelector('.lastPointAbout');

        observer.observe( target );
        observer.observe( targew )

    }




    // Навигация


    function navFcContacts (id){
        currentMainBlock = id;
        navState = true;
        mainBlock.forEach(element=>{
            element.classList.remove("showMainBlock");
            element.classList.remove("baclist");
            element.classList.remove("bottom-baclist");
            element.classList.remove("bottom-showblock");
            stateAnim = false;

        })
        mainBlock[0].classList.add("baclist");
        mainBlock[currentMainBlock].classList.remove("hiddenMainBlock")
        mainBlock[currentMainBlock].classList.add("showMainBlock")
        setTimeout(()=>{
        mainBlock[0].classList.remove("baclist");
            mainBlock[0].classList.add("hiddenMainBlock");
            stateAnim = true;

        },1000)
    }

    function btnUpFc (id){
        currentMainBlock = 0;
        mainBlock.forEach(element=>{
            element.classList.remove("showMainBlock");
            element.classList.remove("baclist");
            element.classList.remove("bottom-baclist");
            element.classList.remove("bottom-showblock");
            stateAnim = false;
        })
        mainBlock[id].classList.add("bottom-baclist");
        mainBlock[currentMainBlock].classList.remove("hiddenMainBlock")
        mainBlock[currentMainBlock].classList.add("bottom-showblock")
        setTimeout(()=>{
            mainBlock[id].classList.remove("bottom-baclist");
            mainBlock[id].classList.add("hiddenMainBlock");

            stateAnim = true;
        },1000)
    }


    const headerBtn = document.querySelector('.header-buttom');
    const contactsLiBtn = document.querySelector('#contacts');
    const aboutLiBtn = document.querySelector('#about');
    const serviceLiBtn = document.querySelector('#service');
    const portfolioLiBtn = document.querySelector('#portfolio');
    const btnUp = document.querySelector('.btn-up');







    headerBtn.addEventListener('click' , ()=>{
        navFcContacts(5);
    })
    contactsLiBtn.addEventListener('click' , ()=>{
        navFcContacts(5);
    })
    aboutLiBtn.addEventListener('click' , ()=>{
        navFcContacts(4);
    })
    serviceLiBtn.addEventListener('click' , ()=>{
        navFcContacts(2);
    })
    portfolioLiBtn.addEventListener('click' , ()=>{
        navFcContacts(1);
    })
    btnUp.addEventListener('click' , ()=>{
        btnUpFc(currentMainBlock);
    })
}else{
    const navbarBlockMobile = document.querySelector('.navbar-mobile-block');
    document.querySelector('.menu-btn').addEventListener('click' , ()=>{
        if(navbarBlockMobile.style.visibility == 'hidden'){
            navbarBlockMobile.style.visibility = 'visible';
            navbarBlockMobile.style.transform = 'translateX(0%)';

        }else{
            navbarBlockMobile.style.transform = 'translateX(-100%)';
            navbarBlockMobile.style.visibility = 'hidden';
        }
    })
}