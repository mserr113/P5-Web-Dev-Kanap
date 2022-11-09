const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

async function populate() {
    const requestURL = `http://localhost:3000/api/products/${id}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    const product = await response.json();

const itemImg = document.getElementsByClassName("item__img")[0];
const img = document.createElement('img');
img.setAttribute("id","image");
img.src = product.imageUrl
itemImg.appendChild(img);

document.getElementById('title').innerHTML = `
    <h1>${product.name}</h1>
    `
document.getElementById('price').innerHTML = `
    <span>${product.price}</span>
    `
document.getElementById('description').innerHTML = `
    <p>${product.description}</p>
    `
const colorOption = document.getElementById("colors");
    const colorList = product.colors;

    for (let color of colorList) {
        let newColorOption = document.createElement('option');
        newColorOption.textContent = color;
        newColorOption.value = color;

    colorOption.appendChild(newColorOption);
    }
}

populate();

const button = document.getElementById('addToCart');
    button.setAttribute("data-id", id);
button.addEventListener('click', addProductToCart);

//keeps item quantity from being less than 1 or more than 100
document.getElementById("quantity").addEventListener("change", function() {
    let v = parseInt(this.value);
    if (v < 1) this.value = 1;
    if (v > 100) this.value = 100;
  });

function addProductToCart(e) {
    var id = e.target.getAttribute("data-id");
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    const color = document.getElementById('colors').value;
    //add in a check to make sure quantity is within min and max incl alert
    //add in danger class?
    //if statement to stop them from adding to the cart if they are over max
    // //wrap return in if statement 
    var quantity = parseInt(document.getElementById('quantity').value);
    
    var itemDetails = {
        id,
        color,
        quantity
    };

    var existingCart = cart.find((x) => x.id === id && x.color === color);
    //check if product already exists in cart
    if(!existingCart){
        cart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    else{
        const newCart = cart.filter((x) => !(x.id === id && x.color === color));
        itemDetails.quantity += parseInt(existingCart.quantity);
        newCart.push(itemDetails);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
}
