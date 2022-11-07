const cartItemsElement = document.getElementById('cart__items');

async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const products = await response.json();

    populateCart(products);

    //delete items from cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loadComplete)
} else {
        loadComplete()
}

//adding event listener to buttons once page is loaded
function loadComplete() {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    for(var i = 0; i < deleteButtons.length; i+=1) {
        var button = deleteButtons[i]
        button.addEventListener('click', deleteFromCart)
    }
}

//event listener for any quantity changes
const quantityInput = document.getElementsByClassName('itemQuantity');
    for(var i = 0; i < quantityInput.length; i+=1) {
        var input = quantityInput[i]
        input.addEventListener('change', updateQuantity)
    }

//deletes item from cart when delete is clicked
function deleteFromCart(e) {
    var buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

//updates cart total when quantity is changed
function updateQuantity(e) {
    var input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

//updates cart total 
function updateCartTotal() {
    var cartItemsSection = document.getElementById("cart__items")
    var cartItemArticle = cartItemsSection.getElementsByClassName("cart__item")
    var total = 0 
        for (var i = 0; i < cartItemArticle.length; i+=1) {
            var cartItem = cartItemArticle[i]
            var priceElement = cartItem.getElementsByClassName('itemPrice')[0]
            var quantityElement = cartItem.getElementsByClassName('itemQuantity')[0]
            var price = parseFloat(priceElement.innerText.replace('€ ',''))
            var quantity = quantityElement.value
            total = total + (price * quantity)        
        }
    document.getElementById('totalPrice').innerText = total;

}
}

var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartItems);

var populateCart = (products) => {
    if(cartItems.length !== 0){
        return (cartItemsElement.innerHTML = cartItems.map((x) => {
            var { id, color, quantity } = x;
            var searchForItem = products.find((y) => y._id === id) || []; 
            return `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src=${searchForItem.imageUrl} alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                    <h2>${searchForItem.name}</h2>
                    <p>${color}</p>
                    <p class="itemPrice" >€ ${searchForItem.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantity : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Delete</p>
                    </div>
                    </div>
                </div>
            </article>
            `;
        })
        .join(""));
    } else {
        cartItemsElement.innerHTML =`
        `
    }
} 

populate();