async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const products = await response.json();

    populateProducts(products);

}

function populateProducts(obj) {
    const section = document.querySelector('section');
    const item = obj.products

    for (const item of obj) {
        const myArticle = document.createElement('article');
        const img = document.createElement('img');
        const myH3 = document.createElement('h3');
        const myPara = document.createElement('p'); 

        img.src = item.imageUrl;
        myH3.textContent = item.name;
        myPara.textContent = item.description;

        myArticle.appendChild(img);
        myArticle.appendChild(myH3);
        myArticle.appendChild(myPara);

        section.appendChild(myArticle);
    }

}

populate();