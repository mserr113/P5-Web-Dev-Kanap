async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const products = await response.json();

    populateProducts(products);

}

function populateProducts(obj) {
    const section = document.querySelector('section');

    for (const item of obj) {
        const myAnchor = document.createElement('a');
        const myArticle = document.createElement('article');
        const myImg = document.createElement('img');
        const myH3 = document.createElement('h3');
        const myPara = document.createElement('p'); 

        myAnchor.href ='product.html?' + "id=" + item._id;
        myImg.src = item.imageUrl;
        myImg.alt = item.altTxt;
        myH3.textContent = item.name;
        myPara.textContent = item.description;
        
        myAnchor.appendChild(myArticle);
        myArticle.appendChild(myImg);
        myArticle.appendChild(myH3);
        myArticle.appendChild(myPara);

        section.appendChild(myAnchor);
    }

}

populate();