const cartItemsElement = document.getElementById('cart__items');

function displayCart() {
    let arrayInLocalStorage = localStorage.getItem("item"); 
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
        const quantityContentDiv = document.createElement('div');
        const quantityParentDiv = document.createElement('div');
        const myQuantity = document.createElement('p');

        myImg.src = (itemsInLocalStorage[0].image);
        myDescription.textContent = (itemsInLocalStorage[0].title);
        myColor.textContent = (itemsInLocalStorage[0].color);
        myPrice.textContent = "€" + (itemsInLocalStorage[0].price);
        //need to add quantitydropdown

        imgParentDiv.appendChild(myImg);

        descriptionParentDiv.appendChild(myDescription);
        descriptionParentDiv.appendChild(myColor);
        descriptionParentDiv.appendChild(myPrice);

        itemContentDiv.appendChild(descriptionParentDiv);

        myArticle.appendChild(imgParentDiv);
        myArticle.appendChild(itemContentDiv);
        
        cartItemsElement.appendChild(myArticle);
    }



displayCart();