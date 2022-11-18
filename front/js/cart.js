const cartItemsElement = document.getElementById('cart__items');

//fetches api so we can render image and price in populateCart function
async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const products = await response.json();

    populateCart(products);

    
//adding event listener to buttons once page is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loadComplete)
} else {
        loadComplete()
}

//event listener for delete
function loadComplete() {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    for(var i = 0; i < deleteButtons.length; i+=1) {
        var button = deleteButtons[i]
        button.addEventListener('click', deleteFromCart)
    }
    updateCartQuantity();
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
    var itemClickedId = buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
    var itemClickedColor = buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute('data-color');
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var newCart = cart.filter((x) => !(x.id === itemClickedId && x.color === itemClickedColor));
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartTotal();
    updateCartQuantity();
}

//updates cart total when quantity is changed
function updateQuantity(e) {
    var input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    var id = input.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
    var color = input.parentElement.parentElement.parentElement.parentElement.getAttribute('data-color');
    var cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((x) => !(x.id === id && x.color === color));
    var quantity = parseInt(input.value)
    newCart.push({id: id, color: color, quantity: quantity});
        localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartTotal();
    updateCartQuantity();

}
    
//updates cart quantity total when quantity is changed
function updateCartQuantity() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var cartQuantity = cart.map(cart => cart.quantity).reduce((sum, val) => sum + val, 0);
    document.getElementById('totalQuantity').innerText = cartQuantity;
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
updateCartTotal()
}



//gets cart items from localstorage or returns an empty array if there isn't anything in localstorage
var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//populates cart or returns nothing if there is nothing in localstorage
var populateCart = (products) => {
    if(cartItems.length !== 0){
        return (cartItemsElement.innerHTML = cartItems.map((x) => {
            var { id, color, quantity } = x;
            var searchForItem = products.find((y) => y._id === id) || []; 
            return `
            <article class="cart__item" data-id= ${id} data-color= ${color}>
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

const orderButton = document.getElementById('order');
    orderButton.addEventListener('click', validate);



function validate() {
    function validateFirstName() {
    var firstNameRegex = /^[a-zA-Z ]{2,30}$/;
    var firstNameCtrl = document.getElementById('firstName').value;
    if (firstNameRegex.test(firstNameCtrl)){                
        return (true)
        }
        alert("No numbers or special characters in first name field!")
        return (false)
    }
    validateFirstName()

    function validateLastName() {
        var lastNameRegex = /^[a-zA-Z ]{2,30}$/;
        var lastNameCtrl = document.getElementById('lastName').value;
        if (lastNameRegex.test(lastNameCtrl)){
        return (true)
        }
        alert("No numbers or special characters in last name field!")
        return (false)
        } 
    validateLastName()

    function validateEmail() {
        var emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var emailCtrl = document.getElementById('email').value;
        if (emailRegex.test(emailCtrl)){
        return (true)
        }
        alert("Enter a valid email address!")
        return (false)
    }
    validateEmail()
}