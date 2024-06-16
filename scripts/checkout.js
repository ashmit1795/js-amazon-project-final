import { cart, removeFromCart, calculateCartQuantity, updateQty } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

// Update the cart quantity when the page is loaded
updateCartQty();

//Generating HTML to render the web page
let cartSummaryHTML = ``;
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingItem;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingItem = product;
        }
    });

    let deliveryOptionId = cartItem.deliveryOptionId;
    let matchingDeliveryOption;
    

    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
            matchingDeliveryOption = option;
        }   
    });

    const today = dayjs();
    const deliveryDate = today.add(matchingDeliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    

    cartSummaryHTML += `
    <div class="cart-item-container cart-item-container-${productId}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src=${matchingItem.image}>

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingItem.name}
            </div>
            <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary" data-product-id = "${matchingItem.id}">
                Update
            </span>
            <input class = "quantity-input">
            <span class = "save-quantity-link link-primary" data-product-id = "${matchingItem.id}">Save</span>
            <span class="delete-quantity-link link-primary" data-product-id = "${matchingItem.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(productId, cartItem)}
        </div>
        </div>
    </div>
    `;
});

document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

function deliveryOptionsHTML(productId, cartItem) {
    let html = ``;
    const today = dayjs();
    deliveryOptions.forEach( (option)=>{
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = option.priceCents === 0 ? 'FREE' :  `$${formatCurrency(option.priceCents)} -`;
        const isChecked = option.id === cartItem.deliveryOptionId ?  'checked' : '';

        html += `
           <div class="delivery-option">
                <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
            </div>
        `

    });
    return html;
}

// Delete an item from cart and render the page
document.querySelectorAll(".delete-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () =>{
            let productId = link.dataset.productId;
            removeFromCart(productId);
            let itemContainer = document.querySelector(`.cart-item-container-${productId}`);
            itemContainer.remove();
            updateCartQty();
        })
    });

function updateCartQty() {
    document.querySelector(".cart-quantity").innerHTML = `${calculateCartQuantity()}`;
}

document.querySelectorAll(".update-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () =>{
            let productId = link.dataset.productId;
            let itemContainer = document.querySelector(`.cart-item-container-${productId}`);
            itemContainer.classList.add("is-editing-quantity");
        })
    });

    document.querySelectorAll(".save-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () =>{
            let productId = link.dataset.productId;
            let itemContainer = document.querySelector(`.cart-item-container-${productId}`);
            itemContainer.classList.remove("is-editing-quantity");
            let newQty = Number(document.querySelector(`.cart-item-container-${productId} .quantity-input`).value);
            if (newQty < 0 || newQty >= 1000) {
                alert(`Quantity must be at least 0 and less than 1000`);
                return;
            }
            document.querySelector(`.quantity-label-${productId}`).innerHTML = newQty;
            updateQty(productId, newQty);
            updateCartQty();
        });
    })