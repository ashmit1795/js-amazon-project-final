import dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

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

//Function to check wether a day is weekend or not
function isWeekend(date) {
    let day = date.format('dddd');
    return day === 'Sunday' || day === 'Saturday';
}

//Function to calculate the delivery date (delivery date doesn't fall on weekend)
export function calculateDeliveryDate(deliveryOption){
    let deliveryDate = dayjs();
    let remainingDays = deliveryOption.deliveryDays;
    while ( remainingDays > 0){
        if (!isWeekend(deliveryDate)){
            remainingDays--;
        }
        deliveryDate = deliveryDate.add(1, 'day');
    }
    
    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}