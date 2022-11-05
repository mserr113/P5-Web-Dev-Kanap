const cartItemsElement = document.getElementById('cart__items');

function displayCart() {
    let arrayInLocalStorage = localStorage.getItem('cart'); 
    itemsInLocalStorage = JSON.parse(arrayInLocalStorage);
    
    populateCart();
}

function populateCart() {
    const myArticle = document.createElement('article');
    myArticle.setAttribute("class","cart__item");
    //need to add data-id
    //need to add data-color
    const imgParentDiv = document.createElement('div');
    imgParentDiv.setAttribute("class","cart__item__img");
    const myImg = document.createElement('img');
    const itemContentDiv = document.createElement('div');
    itemContentDiv.setAttribute("class","cart__item__content");
    const descriptionParentDiv = document.createElement('div');
    descriptionParentDiv.setAttribute("class","cart__item__content__description");
    const myDescription = document.createElement('h2');
    const myColor = document.createElement('p');
    const myPrice = document.createElement('p');
    myPrice.setAttribute("class","itemPrice");
    const quantityContentDiv = document.createElement('div');
    quantityContentDiv.setAttribute("class","cart__item__content__settings");
    const quantityParentDiv = document.createElement('div');
    quantityParentDiv.setAttribute("class","cart__item__content__settings__quantity");
    const quantity = document.createElement('p');
    const myQuantity = document.createElement('INPUT');
    myQuantity.setAttribute("class","itemQuantity");
    myQuantity.setAttribute("name","itemQuantity");
    myQuantity.setAttribute("type", "number");
    const deleteParentDiv = document.createElement('div');
    deleteParentDiv.setAttribute("class","cart__item__content__settings__delete");
    const deleteItem = document.createElement('p');
    deleteItem.setAttribute("class","deleteItem");

    myImg.src = (itemsInLocalStorage[0].image);
    myDescription.textContent = (itemsInLocalStorage.title);
    myColor.textContent = (itemsInLocalStorage.color);
    myPrice.textContent = "€" + (itemsInLocalStorage.price);
    quantity.textContent = "Quantity : "
    myQuantity.setAttribute("value", itemsInLocalStorage.quantity);
    //do I need the min max? I read 0-100 is the default.
    //need to apply adjustment/message if more than 100 is entered.
    myQuantity.setAttribute("min", "1");
    myQuantity.setAttribute("max", "100");
    deleteItem.textContent = "Delete";

    imgParentDiv.appendChild(myImg);

    descriptionParentDiv.appendChild(myDescription);
    descriptionParentDiv.appendChild(myColor);
    descriptionParentDiv.appendChild(myPrice);

    quantityParentDiv.appendChild(quantity);
    quantityParentDiv.appendChild(myQuantity);
    quantityContentDiv.appendChild(quantityParentDiv);

    deleteParentDiv.appendChild(deleteItem);

    itemContentDiv.appendChild(descriptionParentDiv);
    itemContentDiv.appendChild(quantityContentDiv);
    itemContentDiv.appendChild(deleteParentDiv);

    myArticle.appendChild(imgParentDiv);
    myArticle.appendChild(itemContentDiv);
    
    cartItemsElement.appendChild(myArticle);
}

displayCart();

//Min-max for quantity field
// document.getElementsByClassName("itemQuantity").addEventListener("change", function() {
//     let v = parseInt(this.value);
//     if (v < 1) this.value = 1;
//     if (v > 50) this.value = 50;
//   });

//delete items from cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loadComplete)
} else {
        loadComplete()
}

//adding event listener to buttons once page is loaded
function loadComplete() {
    const deleteButtons = document.getElementsByClassName("deleteItem")
    console.log(deleteButtons)
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
    buttonClicked.parentElement.parentElement.parentElement.remove();
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
    document.getElementById('totalPrice').innerText = total 

}

updateCartTotal();