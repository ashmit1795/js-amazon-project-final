export let cart;

loadFromStrorage();
export function loadFromStrorage() {
    cart = JSON.parse(localStorage.getItem('cart')) ||

    [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }
    ];
}
// Function to save the cart into local storage
function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Function to add items to cart and to manage the cart
export function addToCart(productId, qty = 1) {
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += qty;
    } else {
        cart.push({
            productId: productId,
            quantity: qty,
            deliveryOptionId: '1'
        });
    };
    saveToStorage();
}

// Function to remove item from cart
export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) =>{
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
    
}

//Function to update the cart quantity
export function updateQty(productId, newQty) {
    let matchingItem;
    cart.forEach((cartItem) =>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    matchingItem.quantity = newQty;
    saveToStorage();
}

// Function to calculate cart quantity
export function calculateCartQuantity() {
    let cartQty = 0;
    cart.forEach((cartItem)=>{
        cartQty += cartItem.quantity;
    });

    return cartQty;
}

// Function to Update Delivery Option
export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}