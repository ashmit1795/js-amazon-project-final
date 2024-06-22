import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalItems = 0;
    cart.cartItems.forEach((cartItem) => {
        let product = getProduct(cartItem.productId)
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        totalItems += cartItem.quantity;
        productPriceCents += cartItem.quantity*product.priceCents;
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents*0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    let paymentSummaryHTML = ``;
    paymentSummaryHTML += `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `

    document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;

    document.querySelector(".place-order-button").addEventListener("click", async () =>{
        if (cart.cartItems.length === 0) {
            alert("Cart is Empty!");
            window.location.href = 'amazon.html';
        } else {
            let response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({ 
                    cart : cart
                })
            });
            let order = await response.json();
    
            addOrder(order);
            window.location.href = 'orders.html';
        }
    });
}