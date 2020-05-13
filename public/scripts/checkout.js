function onLoad(){

    var form = document.querySelector('.checkout__form');
    form.addEventListener('submit', function(){
        console.log("hola");
        var input = document.querySelector('.checkoutForm__products');
        input.value = localStorage.getItem('cartList');
        localStorage.removeItem('cartList');
        window.alert("¡Gracias por tu compra!");
    });
 
}
window.addEventListener('load', onLoad);