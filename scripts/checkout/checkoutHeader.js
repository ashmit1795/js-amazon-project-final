export function renderCheckoutHeader(qty){
    let checkoutHeaderHTML = 
    `
        Checkout (<a class="return-to-home-link"
            href="amazon.html"><span class="cart-quantity">${qty}</span> items</a>)
    `;

    document.querySelector(".checkout-header-middle-section").innerHTML = checkoutHeaderHTML;
}