function onLoad(){
    var form = document.querySelector('.checkoutForm');
    form.addEventListener('submit', function(){
        var input = document.querySelector('.checkoutForm__products');
        input.value = localStorage.getItem('cartList');
        localStorage.removeItem('cartList');
    });
}
window.addEventListener('load', onLoad);