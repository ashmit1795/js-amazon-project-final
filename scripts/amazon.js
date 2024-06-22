// import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { cart } from '../data/cart-class.js'
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Update the cart quantity when the page is loaded
updateCartQty();

//Generating HTML for Each product for its container 
let productsHTML = ``;
products.forEach((product)=>{
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsURL()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
            <select class = "quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id = "${product.id}">
            Add to Cart
        </button>
    </div>
    `;
});

//And, finally rendering it into the web page
document.querySelector(".products-grid")
    .innerHTML = productsHTML;


//Function to update cart quantity on the web page
function updateCartQty() {
    if (cart.calculateCartQuantity() === 0) {
    document.querySelector(".cart-quantity").innerHTML = ``;
    } else {
        document.querySelector(".cart-quantity").innerHTML = `${cart.calculateCartQuantity()}`;
    }

}

// Add to Cart
document.querySelectorAll(".add-to-cart-button")
    .forEach((button)=>{
        button.addEventListener("click", ()=>{
            const productId = button.dataset.productId;
            let qty = Number(document.querySelector(`.quantity-selector-${productId}`).value);
            cart.addToCart(productId, qty);
            updateCartQty();
        });
    })



    