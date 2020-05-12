function onLoad(){
    var form = document.querySelector('.checkout__form');
    form.addEventListener('submit', function(){
        var input = document.querySelector('.checkoutForm__products');
        input.value = localStorage.getItem('cartList');
        localStorage.removeItem('cartList');
    });
    var total = 0;
    cartContainer.innerHTML = '';
    cartResume.innerHTML = '';
    cartList.forEach(function (obj, index) {

        var cartResume = document.querySelector('.resume__info');
        var resumeItem = document.createElement('div');
        resumeItem.classList.add('resume__text');
        resumeItem.innerHTML = `   
                <h4 class="resume__name">${obj.name}</h4>
                <h4> $${ obj.price} </h4>   
        `;
        cartResume.appendChild(resumeItem);
        total += parseInt(obj.price);
    });
    var totalElem = document.querySelector('.totalPrice');
     totalElem.innerText = "$"+ total + " COP";
}
window.addEventListener('load', onLoad);