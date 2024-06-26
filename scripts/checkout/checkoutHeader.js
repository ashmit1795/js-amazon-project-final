//Function to render HTML for checkout header in the checkout page 
export function renderCheckoutHeader(qty){
    let checkoutHeaderHTML = 
    `
        Checkout (<a class="return-to-home-link"
            href="index.html"><span class="cart-quantity">${qty}</span> items</a>)
    `;

    document.querySelector(".checkout-header-middle-section").innerHTML = checkoutHeaderHTML;
}
