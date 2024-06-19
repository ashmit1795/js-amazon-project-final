// The program in cart.js is based on procedural programming. 
// Procedural: Functions and data are separate. Functions operate on data passed to them.
// OOP: Data and methods are bundled together in objects.
// This functions is use generate the cart object for different types of cart.
function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
        
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
        },

        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId, qty = 1) {
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            });
        
            if (matchingItem) {
                matchingItem.quantity += qty;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: qty,
                    deliveryOptionId: '1'
                });
            };
            this.saveToStorage();
        },

        removeFromCart(productId) {
            let newCart = [];
        
            this.cartItems.forEach((cartItem) =>{
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
            this.saveToStorage();
            
        },

        updateQty(productId, newQty) {
            let matchingItem;
            this.cartItems.forEach((cartItem) =>{
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            })
        
            matchingItem.quantity = newQty;
            this.saveToStorage();
        },

        calculateCartQuantity() {
            let cartQty = 0;
            this.cartItems.forEach((cartItem)=>{
                cartQty += cartItem.quantity;
            });
        
            return cartQty;
        },

        updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
            saveToStorage();
        }
    }

    return cart;
}

//Function call to generate a general cart
const cart = Cart('cart-oop');
//Function call to generate a business cart
const businessCart = Cart('cart-business');

cart.loadFromStorage();
cart.addToCart("54e0eccd-8f36-462b-b68a-8182611d9add");

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);
