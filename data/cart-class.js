//Class is basically object generator

//This is the class to create the cart object that includes cartItems and various cart functions
class Cart{
    cartItems; //Public Property
    #localStorageKey; //Private Property, it can only bes used inside the class/object generated

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    //Function to load cart items from localStorage or use default cart items
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

    //Function to save cart into the localStorage
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    //Function to add an item to the cart
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
            this.cartItems.unshift({
                productId: productId,
                quantity: qty,
                deliveryOptionId: '1'
            });
        };
        this.saveToStorage();
    }

    //Function to remove an item from the cart
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

    //Function to update the quantity of a particular cart item
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

    //Function to calculate the total cart quantity
    calculateCartQuantity() {
        let cartQty = 0;
        this.cartItems.forEach((cartItem)=>{
            cartQty += cartItem.quantity;
        });
    
        return cartQty;
    }

    //Function to update the deliverOptionId of a particular cart item
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

    //Function to reset the cart
    resetCart(){
        this.cartItems = [];
        this.saveToStorage();
    }

}

//Cart object is generated
export const cart = new Cart('cart-oop');


