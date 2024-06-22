export let orders = JSON.parse(localStorage.getItem('orders')) || [];

console.log(orders)

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}