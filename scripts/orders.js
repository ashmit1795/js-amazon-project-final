import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../data/cart-class.js";
import { updateCartQtyHeader } from "./header.js";

//Function to load the page
function loadPage(){
    let ordersHTML = ``;
    updateCartQtyHeader();
    //Generating HTML to render the order container
    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
            ordersHTML += `
                <div class="order-container">
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${orderTimeString}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$${formatCurrency(order.totalCostCents)}</div>
                            </div>
                        </div>

                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                        </div>
                    </div>

                    <div class="order-details-grid">
                        ${renderOrderDetailsGrid(order)}
                    </div>
                    
                </div>
            `
    });

    document.querySelector(".orders-grid").innerHTML = ordersHTML;

    //To make the buy again button interactive
    document.querySelectorAll(".buy-again-button").forEach((button)=>{
        button.addEventListener("click", ()=>{
            cart.addToCart(button.dataset.productId);
            updateCartQty();
            button.innerHTML = 'Added to Cart';
            setTimeout(() => {
              button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              `;
            }, 1000);
        });
    })

}

loadPage();

//Function to generate HTML to render the order details inside the order container
function renderOrderDetailsGrid(order){
    let orderDetailsGridHTML = ``;
    
    order.products.forEach((product) =>{
        const today = dayjs();
        const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime);
        const estimatedDeliveryTimeString = estimatedDeliveryTime.format('MMMM D');
        const isDelivered = today.isAfter(estimatedDeliveryTime) || today.isSame(estimatedDeliveryTime);

        let deliveredHTML = '<p class = "delivered"><svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="green" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>Delivered</p>';

        let notDeliveredHTML = '<p class = "not-delivered"><svg class="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="red" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Not Delivered</p>';
        
        let isDeliveredHTML = isDelivered ? deliveredHTML : notDeliveredHTML ;

        orderDetailsGridHTML += `
            <div class="product-image-container">
                <img src= ${getProduct(product.productId).image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${getProduct(product.productId).name}
                </div>
                <div class="product-delivery-date">
                    ${isDelivered ? 'Delivered On': 'Arriving On'}: ${estimatedDeliveryTimeString}

                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary" data-product-id=${product.productId}>
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
                ${isDeliveredHTML}
            </div>

            
        `
    });

    return orderDetailsGridHTML; 
}

//To make the search bar functional
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