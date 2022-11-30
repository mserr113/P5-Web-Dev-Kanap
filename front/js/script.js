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
const itemsSection = document.getElementById('items');
//can't remove .html without breaking link.
var populateProducts = (products) => {
    return (itemsSection.innerHTML = products.map((x) => {
            return `
        <a href=./product.html?id=${x._id}>
                <article>
                <img src= ${x.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class= ${x.name} >Kanap name1</h3>
                <p class="productDescription"> ${x.description} </p>
                </article>
        </a>
    `}).join("")) 
};

populate();