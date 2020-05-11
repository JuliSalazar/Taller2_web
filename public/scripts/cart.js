var btnsAddToCart = document.querySelectorAll('.buttonAddToCart');
var cartNum = document.querySelector('.cart__num');
var cartContainer = document.querySelector('.cart__container');


var cartList = [];

if (localStorage.getItem('cartList')) {
    cartList = JSON.parse(localStorage.getItem('cartList'));
}
if (cartContainer) {
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
        listCart()
    });
});

//Ver la lista del carrito
function listCart() {
    var total = 0;
    cartContainer.innerHTML = '';
    cartList.forEach(function (obj, index) {
        var newItem = document.createElement('div');
        newItem.classList.add('cart__product');
        newItem.innerHTML = `
            <button class="cart__button"><img src="/src/images/delete.png"></button>
            <img src=${ obj.img }> 
            <div class="cart__info">
                <h4 class="cart__name">${obj.name}</h4>
                <p>${ obj.desc }</p>
                <h4> $${ obj.price} </h4>
            </div> 
        `;
        var resumeItem = document.createElement('div');
        resumeItem.classList.add('info');
        resumeItem.innerHTML = `
            <div class="cart__info">
                <h4 class="cart__name">${obj.name}</h4>
                <h4> $${ obj.price} </h4>
            </div> 
        `;
        var btn = newItem.querySelector('button');
        btn.addEventListener('click', function () {
            cartList.splice(index, 1);
            cartNum.innerText = cartList.length;
            localStorage.setItem('cartList', JSON.stringify(cartList));
            listCart();
        });

        cartContainer.appendChild(newItem);
        cartContainer.appendChild(resumeItem);
        total += parseInt(obj.price);
    });
    var totalElem = document.querySelector('.cart__total');
    // totalElem.innerText = total;
}
cartNum.addEventListener('click', listCart);