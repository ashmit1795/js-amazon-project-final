import { cart, removeFromCart, calculateCartQuantity, updateQty, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

//Function to render the order summary web page
export function renderOrderSummary() {
    // Update the cart quantity when the page is loaded
    updateCheckoutHeader();

    //Generating HTML to render the web page
    let cartSummaryHTML = ``;
    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        const product = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        // const today = dayjs();
        // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        // const dateString = deliveryDate.format('dddd, MMMM D');
        const dateString = calculateDeliveryDate(deliveryOption);
        

        cartSummaryHTML += `
        <div class="cart-item-container cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src=${product.image}>
                <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        ${product.getPrice()}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label quantity-label-${product.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id = "${product.id}">
                            Update
                        </span>
                        <input class = "quantity-input">
                        <span class = "save-quantity-link link-primary" data-product-id = "${product.id}">Save</span>
                        <span class="delete-quantity-link link-primary" data-product-id = "${product.id}">
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
        deliveryOptions.forEach( (deliveryOption)=>{
            const dateString = calculateDeliveryDate(deliveryOption);
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' :  `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId ?  'checked' : '';

            html += `
                <div class="delivery-option" data-product-id = "${productId}" data-delivery-option-id = "${deliveryOption.id}">
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
                updateCheckoutHeader();
                // Render HTML for Order Summary when a cart item is deleted
                renderOrderSummary();
                // Render HTML for Payment Summary when a cart item is deleted
                renderPaymentSummary();
            })
        });

    //Function to update the checkout header
    function updateCheckoutHeader() {
        renderCheckoutHeader(calculateCartQuantity());
    }

    document.querySelectorAll(".update-quantity-link")
        .forEach((link) => {
            link.addEventListener("click", () =>{
                let productId = link.dataset.productId;
                let itemContainer = document.querySelector(`.cart-item-container-${productId}`);
                itemContainer.classList.add("is-editing-quantity");
            });
        });

    document.querySelectorAll(".save-quantity-link")
        .forEach((link) => {
            link.addEventListener("click", () =>{
                let productId = link.dataset.productId;
                let itemContainer = document.querySelector(`.cart-item-container-${productId}`);
                itemContainer.classList.remove("is-editing-quantity");
                let newQty = Number(document.querySelector(`.cart-item-container-${productId} .quantity-input`).value);
                if (newQty <= 0 || newQty >= 1000) {
                    alert(`Quantity must be at least 1 and less than 1000`);
                    return;
                }
                updateQty(productId, newQty);
                updateCheckoutHeader();
                // Render HTML for Order Summary when the cart is updated and saved
                renderOrderSummary();
                // Render HTML for Payment Summary when the cart is updated and saved
                renderPaymentSummary();
            });
        });

    document.querySelectorAll(".delivery-option")
        .forEach((option) => {
            option.addEventListener("click", () =>{
                const { productId, deliveryOptionId} = option.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                // Render HTML when updating delivery option(recursive function call)
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}
