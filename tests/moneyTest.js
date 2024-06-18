import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

//Basic Test Case
console.log("converts cents into dollar");
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

//Edge Case - 1
console.log("works with 0");
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

//Edge Case - 2
console.log("rounds upto the nearest cent")
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}