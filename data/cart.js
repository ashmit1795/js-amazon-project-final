export const cart = [];

//Function to add items to cart an₫to manage the cart
export function addToCart(productId, qty) {
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
            quantity: qty
        });
    }
}