const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

//creates JSON data from id in URL param
async function populate() {
    const requestURL = `http://localhost:3000/api/products/${id}`;
    const request = new Request(requestURL);
    const response = await fetch(request);
    const product = await response.json();


    const itemImg = document.getElementsByClassName("item__img")[0];
    const img = document.createElement('img');
    img.setAttribute("id", "image");
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
document.getElementById("quantity").addEventListener("change", function () {
    const quantityValue = parseInt(this.value);
    if (quantityValue < 1) {
        alert("Number of articles cannot be less than 1");
    }
    if (quantityValue > 100) {
        alert("Number of articles cannot exceed 100");
    }
});

//adds product to cart
function addProductToCart(e) {
    const id = e.target.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const color = document.getElementById('colors').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    let itemDetails = {
        id,
        color,
        quantity
    };
    //checks that quantity does not exceed 100
    if (itemDetails.quantity > 100) {
        alert("Number of articles cannot exceed 100")
        return
    }
    //checks that a color is selected 
    if (itemDetails.color === "") {
        alert("Please choose your color")
        return
    }
    else {
        const existingCart = cart.find((x) => x.id === id && x.color === color);
        //check if product already exists in cart
        if (!existingCart) {
            cart.push(itemDetails);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            const newCart = cart.filter((x) => !(x.id === id && x.color === color));
            itemDetails.quantity += parseInt(existingCart.quantity);
            newCart.push(itemDetails);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

}
