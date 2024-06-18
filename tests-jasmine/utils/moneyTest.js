import { formatCurrency } from "../../scripts/utils/money.js";

//Describe function is use to create a test suite and it function is use create tests inside the test suite
describe('test suite: formatCurrency', () => { 
    it('converts cents into dollar', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds upto the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});