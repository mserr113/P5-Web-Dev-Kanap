const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('id');

document.getElementById('orderId').innerHTML = `
    <span>${orderId}</span>`