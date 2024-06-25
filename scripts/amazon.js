// import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { cart } from '../data/cart-class.js'
import { products } from "../data/products.js";
import { updateCartQtyHeader } from './header.js';

// Update the cart quantity when the page is loaded
updateCartQtyHeader();

//Generating HTML for Each product for its container 
let productsHTML = ``;

let filteredProducts = products;

let url = new URL(window.location.href);
let searchQuery = url.searchParams.get("search");

//To filter products based on search query
if (searchQuery) {
    filteredProducts = products.filter((product) =>{
        return product.name.toLowerCase().includes(searchQuery) || product.keywords.includes(searchQuery);
    })
}

if (filteredProducts.length === 0){
    productsHTML = `<p style="margin: 20px"> No products matched your search query. </p>`;
}

filteredProducts.forEach((product)=>{
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
        <div class="added-to-cart added-to-cart-${product.id}">
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

// Add to Cart
document.querySelectorAll(".add-to-cart-button")
    .forEach((button)=>{
        let addedMessageTimeoutId;
        button.addEventListener("click", ()=>{
            const productId = button.dataset.productId;
            let qty = Number(document.querySelector(`.quantity-selector-${productId}`).value);
            cart.addToCart(productId, qty);
            updateCartQtyHeader();
            document.querySelector(`.added-to-cart-${productId}`).classList.add("added");

            if (addedMessageTimeoutId) {
                clearTimeout(addedMessageTimeoutId)
            }
            const timeoutId = setTimeout(()=>{
                document.querySelector(`.added-to-cart-${productId}`).classList.remove("added");
            }, 2000);

            addedMessageTimeoutId = timeoutId;
        });
    })

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
    