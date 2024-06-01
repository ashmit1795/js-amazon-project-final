export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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