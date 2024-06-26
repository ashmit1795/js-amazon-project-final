import { cart } from "../../data/cart.js";

describe('test suite: addToCart', () => { 
    it('adds an existing product to the cart', () =>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake( () => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                },
            ]);
        });
        

        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems[0].quantity).toEqual(2);

    });

    it('adds a new product to the cart', () =>{
        spyOn(localStorage, 'setItem');
        // We need to use mock to get an empty array from the local storage always
        spyOn(localStorage, 'getItem').and.callFake( () => {
            return JSON.stringify([]);
        });
        
        

        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems.length).toEqual(1); // Initially this test will fail, since by default the cart is not empty(even if it has no data in local storage)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    });
 })