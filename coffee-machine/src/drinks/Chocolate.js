import BaseDrink from "./BaseDrink";

export default class Chocolate extends BaseDrink {
    getPrice() {
        return 0.5;
    }

    getCode() {
        return 'H'
    }
}