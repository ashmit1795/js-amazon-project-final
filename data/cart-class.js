//Class is basically object generator

class Cart{
    cartItems; //Public Property
    #localStorageKey; //Public Property, it can only bes used inside the class/object generated

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
    
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

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
    }

    removeFromCart(productId) {
        let newCart = [];
    
        this.cartItems.forEach((cartItem) =>{
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
        this.saveToStorage();
        
    }

    updateQty(productId, newQty) {
        let matchingItem;
        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        })
    
        matchingItem.quantity = newQty;
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQty = 0;
        this.cartItems.forEach((cartItem)=>{
            cartQty += cartItem.quantity;
        });
    
        return cartQty;
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    resetCart(){
        this.cartItems = [];
        this.saveToStorage();
    }

}

export const cart = new Cart('cart-oop');


