export let orders = JSON.parse(localStorage.getItem('orders')) || [];

//Function to add order
export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

//Function to save orders into the localStorage
function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to get a particular order from the orders array
export function getOrder(orderId){
    let matchingOrder;

    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order
        }
    });

    return matchingOrder;
}