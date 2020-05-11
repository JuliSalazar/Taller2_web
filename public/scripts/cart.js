var btnsAddToCart = document.querySelectorAll('.buttonAddToCart');
var cartBtn = document.querySelector('.cart__btn');
var cartContainer = document.querySelector('.cart__container');


var cartList = [];

if(localStorage.getItem('cartList')){
    cartList = JSON.parse(localStorage.getItem('cartList'));
}
if(cartContainer){
    listCart();
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
            price: parseInt(price),
        });
        cartBtn.innerText = cartList.length;
        localStorage.setItem('cartList', JSON.stringify(cartList));
        listCart()
    });
});

//Ver la lista del carrito
function listCart(){
    var total = 0;
    cartContainer.innerHTML = '';
    cartList.forEach(function(obj, index){
        var newItem = document.createElement('div');
        newItem.classList.add('cart__product');
        newItem.innerHTML = `
            <h4 class="name">`
            + obj.name +
            `</h4>
           
            <h4> ${ obj.price} </h4>
            <button class="button">x</button>
        `;
        var btn = newItem.querySelector('button');
        btn.addEventListener('click',function(){
            cartList.splice(index,1);
            cartBtn.innerText = cartList.length;
            localStorage.setItem('cartList', JSON.stringify(cartList));
            listCart();
        });
        
        cartContainer.appendChild(newItem);
        total += parseInt(obj.price);
    });
    var totalElem = document.querySelector('.cart__total');
   // totalElem.innerText = total;
}
cartBtn.addEventListener('click', listCart);