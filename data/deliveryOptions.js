export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]

//Function to get the delivery option from the delivery option id
export function getDeliveryOption(deliveryOptionId){
    let matchingDeliveryOption;

    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
            matchingDeliveryOption = option;
        }   
    });

    return matchingDeliveryOption || deliveryOptions[0];
}