import { cart } from "../data/cart.js";

//Function to update cart quantity on the web page
export function updateCartQtyHeader() {
    if (cart.calculateCartQuantity() === 0) {
        document.querySelector(".cart-quantity").innerHTML = ``;
    } else {
        document.querySelector(".cart-quantity").innerHTML = `${cart.calculateCartQuantity()}`;
    }

}