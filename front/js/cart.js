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
        for (const i = 0; i < deleteButtons.length; i += 1) {
            const button = deleteButtons[i]
            button.addEventListener('click', deleteFromCart)
        }
        updateCartQuantity();
    }

    //event listener for any quantity changes
    const quantityInput = document.getElementsByClassName('itemQuantity');
    for (const i = 0; i < quantityInput.length; i += 1) {
        const input = quantityInput[i]
        input.addEventListener('change', updateQuantity)
    }

    //deletes item from cart when delete is clicked
    function deleteFromCart(e) {
        const buttonClicked = e.target;
        const itemClickedId = buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
        const itemClickedColor = buttonClicked.parentElement.parentElement.parentElement.parentElement.getAttribute('data-color');
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCart = cart.filter((x) => !(x.id === itemClickedId && x.color === itemClickedColor));
        localStorage.setItem("cart", JSON.stringify(newCart));
        updateCartTotal();
        updateCartQuantity();
    }

    //updates cart total when quantity is changed
    function updateQuantity(e) {
        const input = e.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        const id = input.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
        const color = input.parentElement.parentElement.parentElement.parentElement.getAttribute('data-color');
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.filter((x) => !(x.id === id && x.color === color));
        const quantity = parseInt(input.value)
        newCart.push({ id: id, color: color, quantity: quantity });
        localStorage.setItem('cart', JSON.stringify(newCart));
        updateCartTotal();
        updateCartQuantity();

    }

    //updates cart quantity total when quantity is changed
    function updateCartQuantity() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartQuantity = cart.map(cart => cart.quantity).reduce((sum, val) => sum + val, 0);
        document.getElementById('totalQuantity').innerText = cartQuantity;
    }

    //updates cart total 
    function updateCartTotal() {
        const cartItemsSection = document.getElementById("cart__items")
        const cartItemArticle = cartItemsSection.getElementsByClassName("cart__item")
        const total = 0
        for (const i = 0; i < cartItemArticle.length; i += 1) {
            const cartItem = cartItemArticle[i]
            const priceElement = cartItem.getElementsByClassName('itemPrice')[0]
            const quantityElement = cartItem.getElementsByClassName('itemQuantity')[0]
            const price = parseFloat(priceElement.innerText.replace('€ ', ''))
            const quantity = quantityElement.value
            total = total + (price * quantity)
        }
        document.getElementById('totalPrice').innerText = total;

    }
    updateCartTotal()
}



//gets cart items from localstorage or returns an empty array if there isn't anything in localstorage
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//populates cart or returns nothing if there is nothing in localstorage
const populateCart = (products) => {
    if (cartItems.length !== 0) {
        return (cartItemsElement.innerHTML = cartItems.map((x) => {
            let { id, color, quantity } = x;
            const searchForItem = products.find((y) => y._id === id) || [];
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
        cartItemsElement.innerHTML = `0 articles in your cart
        `
        return
    }
}

populate();

// const orderButton = document.getElementById('order');    
//     orderButton.addEventListener('click', validate);

const form = document.getElementsByClassName('cart__order__form')[0];
form.addEventListener("submit", function (event) {
    event.preventDefault()
    validate(event);
});

function validate(event) {
    firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    const firstNameRegex = /^[a-zA-Z ]{2,30}$/;
    const lastNameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if (firstName.trim() == "" || lastName.trim() == "" || address.trim() == "" || city.trim() == "" || email.trim() == "") {
        alert("The form is missing information");
    }

    else if ((firstNameRegex.test(firstName) && lastNameRegex.test(lastName) && emailRegex.test(email))) {
        alert("Success!");
        getFormData(event);
    }

    else {
        alert("There is invalid information in the form");
    }
}

//get form data and post
function getFormData(event) {
    console.log("getting form data")
    const myFormData = new FormData(event.target);
    const formDataObj = {
        contact: {}
    };
    myFormData.forEach((value, key) => (formDataObj.contact[key] = value));
    formDataObj.products = JSON.parse(localStorage.getItem('cart')).map((product) => product.id)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    };
    fetch('http://localhost:3000/api/products/order', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const orderId = data.orderId;
            window.location.href = "./confirmation.html?id=" + orderId
            localStorage.clear();
        })
        .catch((error) => { alert("error in request: " + error) });
};