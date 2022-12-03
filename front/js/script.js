//creates JSON product data
async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const products = await response.json();

    //runs populate products function
    populateProducts(products); 

}

//populates product
//fail safes: filter out products that are missing info, .catch catches errors, "type of" tests, eg. isArray
const itemsSection = document.getElementById('items');
var populateProducts = (products) => {
    //filters out any items with missing information before mapping.
    var productsWithImages = products.filter((x) => {
        return x.imageUrl !=="http://localhost:3000/images/" && x.name !=="" && x.description !=="" && x.colors !=="" && x.price !=="";
    })
    //maps items that contain all product information in API
    return (itemsSection.innerHTML = productsWithImages.map((x) => {
            return `
        <a href=./product.html?id=${x._id}>
                <article>
                <img src= ${x.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName"> ${x.name} </h3>
                <p class="productDescription"> ${x.description} </p>
                </article>
        </a>
    `}).join("")) 
};

populate();