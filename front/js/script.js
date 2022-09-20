async function populate() {

    const requestURL = 'http://localhost:3000/api/products';
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const products = await response.json();
  
    populateProducts(products);

    function populateProducts(obj) {
        const section = document.queryselector('section');
        const products = obj.products;

        for (const product of products) {
            const myArticle = document.createElement('article');
            const myH3 = document.createElement('h3');
            const myPara = document.createElement('p'); 

            myArticle.appendChild(myH3);
            myArticle.appendChild(myPara);
        }
    }
}