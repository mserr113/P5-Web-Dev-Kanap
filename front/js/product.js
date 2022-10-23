const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
console.log(id);

async function populate() {

    const requestURL = `http://localhost:3000/api/products/${id}`;
    console.log(requestURL);
    const request = new Request(requestURL);
    const response = await fetch(request);
    console.log(response);
    const product = await response.json();
    console.log(product)

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
const item = [];
button.addEventListener('click', addProductToCart);

function addProductToCart(e) {
    const image = document.getElementById('image').src;
    const title = document.getElementById('title').textContent;
    const price = document.getElementById('price').textContent;
    const color = document.getElementById('colors').value;
    const quantity = document.getElementById('quantity').value;
    const itemDetails = {
        id,
        image,
        title,
        price,
        color,
        quantity
    };
    item.push(itemDetails);
    localStorage.setItem('item', JSON.stringify(item));

}
