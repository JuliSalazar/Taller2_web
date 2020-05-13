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

//Javascript para el funcionamiento de boton de filtros
var menuFilter = document.querySelector('.filtersMobile');
var btnFilter = document.querySelector('.store__btnFilter');

var handleFilterClick = function () {
    menuFilter.classList.toggle('filtersMobile--active');
}
if(btnFilter){btnFilter.addEventListener('click', handleFilterClick);}

//Javascript para el funcionamiento de boton de orders
var menuOrder = document.querySelector('.ordersMobile');
var btnOrder = document.querySelector('.store__btnOrder');
var handleOrderClick = function () {
    menuOrder.classList.toggle('ordersMobile--active');
}
if(btnOrder)btnOrder.addEventListener('click', handleOrderClick);

//Javascript para el funcionamiento de boton cerrar del menu de filtros mobile
var btnCloseFilters = document.querySelector('.closeMenuFilters');
if(btnCloseFilters)btnCloseFilters.addEventListener('click', handleFilterClick);

var btnCloseOrders = document.querySelector('.closeMenuOrders');
if(btnCloseOrders)btnCloseOrders.addEventListener('click', handleOrderClick);

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




  




