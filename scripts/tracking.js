import { getOrder } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { updateCartQtyHeader } from "./header.js";


let url = new URL(window.location.href)
let productId = url.searchParams.get('productId');
let orderId = url.searchParams.get('orderId');

console.log(getProductDetails(productId, getOrder(orderId)));

function loadPage(){
    updateCartQtyHeader();
    let trackingHTML = ``;
    let product = getProduct(productId);
    let orderDetails = getOrder(orderId);
    let productDetails = getProductDetails(productId, orderDetails);
    let deliveryDateString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');

    //Calculate the progress bar percentage
    let today = dayjs();
    let estimatedDeliveryTime = dayjs(productDetails.estimatedDeliveryTime)
    let orderTime = dayjs(orderDetails.orderTime);
    let progressBarPercentage = ((today - orderTime)/(estimatedDeliveryTime - orderTime))*100;
    console.log(progressBarPercentage);
    
    trackingHTML += `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${deliveryDateString}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${productDetails.quantity}
            </div>

            <img class="product-image" src=${product.image}>

            <div class="progress-labels-container">
                <div class="progress-label ${progressBarPercentage < 49 ? 'current-status' : ''}">
                    Preparing
                </div>
                <div class="progress-label ${(progressBarPercentage >= 49 && progressBarPercentage < 100)  ? 'current-status' : ''}">
                    Shipped
                </div>
                <div class="progress-label ${progressBarPercentage >= 100 ? 'current-status' : ''}">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width : ${progressBarPercentage}%"></div>
            </div>
        </div>
    `

    document.querySelector(".main").innerHTML = trackingHTML;
}

loadPage();



function getProductDetails(productId, order){
    let matchingProduct;

    order.products.forEach((product) => {
        if (product.productId === productId) {
            matchingProduct = product
        }
    })

    return matchingProduct;
}

document.querySelector(".search-button").addEventListener("click", ()=>{
    let searchInput = document.querySelector(".search-bar").value.toLowerCase();
    window.location.href = `amazon.html?search=${searchInput}`;
});

document.querySelector(".search-bar").addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        let searchInput = document.querySelector(".search-bar").value.toLowerCase();
        window.location.href = `amazon.html?search=${searchInput}`;
    }
})