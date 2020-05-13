var btnsAddToCart = document.querySelectorAll('.buttonAddToCart');
var cartNum = document.querySelector('.cart__num');
var cartProducts = document.querySelector('.cart__products');
var cartResume = document.querySelector('.resume__info');

var cartBtnPay = document.querySelector('.cart__button');

var cartList = [];

if (localStorage.getItem('cartList')) {
    cartList = JSON.parse(localStorage.getItem('cartList'));
}
if (cartProducts) {
    listCart();
}
if(cartResume){
    listCart();
}


cartNum.innerText = cartList.length;

btnsAddToCart.forEach(function (elem) {
    elem.addEventListener('click', function () {
        var id = elem.getAttribute('data-id');
        var name = elem.getAttribute('data-name');
        var price = elem.getAttribute('data-price');
        var desc = elem.getAttribute('data-desc');
        var img = elem.getAttribute('data-img');
        cartList.push({
            id: id,
            name: name,
            price: parseInt(price),
            img: img,
            desc: desc,
        });
        cartNum.innerText = cartList.length;
        localStorage.setItem('cartList', JSON.stringify(cartList));
        listCart();
    });
});



//Ver la lista del carrito
function listCart() {
    var total = 0;
    if (cartProducts) {cartProducts.innerHTML = '';}
    if(cartResume){cartResume.innerHTML = '';}
    cartList.forEach(function (obj, index) {
        var newItem = document.createElement('div');
        newItem.classList.add('cart__product');
        newItem.innerHTML = `
            <button class="cart__button"><img src="/src/images/delete.png"></button>
            <img src=${ obj.img}> 
            <div class="cart__info">
                <h4 class="cart__name">${obj.name}</h4>
                <p>${ obj.desc}</p>
                <h4> $${ obj.price} </h4>
            </div> 
        `;
        var resumeItem = document.createElement('div');
        resumeItem.classList.add('resume__text');
        resumeItem.innerHTML = `   
                <h4 class="resume__name">${obj.name}</h4>
                <h4> $${ obj.price} </h4>   
        `;

        var btn = newItem.querySelector('button');
        btn.addEventListener('click', function () {
            cartList.splice(index, 1);
            cartNum.innerText = cartList.length;
            localStorage.setItem('cartList', JSON.stringify(cartList));
            listCart();
        });

      
        if (cartProducts) {cartProducts.appendChild(newItem);}
        if(cartResume){cartResume.appendChild(resumeItem);}

        total += parseInt(obj.price);
    });
    var totalElem = document.querySelector('.totalPrice');
    if(totalElem){
     totalElem.innerText = "$"+ total + " COP";}

}
cartNum.addEventListener('click', listCart);
