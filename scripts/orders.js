import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../data/cart-class.js";
import { updateCartQtyHeader } from "./header.js";

function loadPage(){
    let ordersHTML = ``;
    updateCartQtyHeader();
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

function renderOrderDetailsGrid(order){
    let orderDetailsGridHTML = ``;
    
    order.products.forEach((product) =>{
        const estimatedDeliveryTimeString = dayjs(product.estimatedDeliveryTime).format('MMMM D');
        orderDetailsGridHTML += `
            <div class="product-image-container">
                <img src= ${getProduct(product.productId).image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${getProduct(product.productId).name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${estimatedDeliveryTimeString}
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
            </div>
        `
    });

    return orderDetailsGridHTML; 
}