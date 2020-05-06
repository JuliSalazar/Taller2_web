var btnsAddToCart = document.querySelectorAll('.buttonAddToCart');
var cartBtn = document.querySelector('.cart__btn');

var cartList = [];

if(localStorage.getItem('cartList')){
    cartList = JSON.parse(localStorage.getItem('cartList'));
}

cartBtn.innerText = cartList.length;

btnsAddToCart.forEach(function(elem){
    elem.addEventListener('click',function(){
        var id = elem.getAttribute('data-id');
        var name = elem.getAttribute('data-name');
        var price = elem.getAttribute('data-price');
        
        cartList.push({
            id: id,
            name: name,
            price: price,
        });
        cartBtn.innerText = cartList.length;
        localStorage.setItem('cartList', JSON.stringify(cartList));
    });
});
