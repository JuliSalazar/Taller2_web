//Javascript para funcionamiento del menú hamburguesa
var headerNav = document.querySelector('.header__nav');
var iconMenu = document.querySelector('.icon-menu');
var handleMenuClick = function () {
    
    headerNav.classList.toggle('header__nav--mobile');
    iconMenu.classList.toggle("icon-menu--open");
}
iconMenu.addEventListener('click', handleMenuClick);

function handleWindowResize () {
    if(window.innerWidth > 400){
        headerNav.classList.remove('header__nav--mobile');
    }
}
window.addEventListener('resize', handleWindowResize);



//Javascript para el funcionamiento del slider de galería de imagenes

var btnRight = document.querySelector('.arrow--right');
var btnLeft = document.querySelector('.arrow--left');
var galleryStrip = document.querySelector(".gallery__strip");
var posX = 0;
if(galleryStrip){
    var width = galleryStrip.offsetWidth;
    function handleBtnNextClick(){
        var quantity = galleryStrip.children.length;
        if(posX > -width * (quantity - 1)){
            posX -= width;
        } else {
            posX = 0;
        }
        galleryStrip.style.transform = 'translate(' + posX + 'px, 0px)';
    }
        btnRight.addEventListener('click',handleBtnNextClick);
    
        function handleBtnPrevClick () {
            var quantity = galleryStrip.children.length;
            if(posX < 0){
                posX += width;
            } else {
                posX = -width * (quantity - 1);
            }
            galleryStrip.style.transform = 'translate(' + posX + 'px, 0px)';
        }
        btnLeft.addEventListener('click', handleBtnPrevClick);
}

//Javascript para el funcionamiento de la interacción del usuario con las imagenes

var projectImage = document.querySelector('.project__image');
var projectInput = document.querySelector('.project__input');
if(projectImage){
    function handleProjectInput () {
        var index = projectInput.value;
        projectImage.setAttribute('src', '/src/images/agenda' + index + '.jpg');
    }
    handleProjectInput();
    projectInput.addEventListener('input', handleProjectInput);
}

$(function(){

    $('input[type="number"]').niceNumber();
  
  });



  




