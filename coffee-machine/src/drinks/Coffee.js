import BaseDrink from "./BaseDrink";

export default class Coffee extends BaseDrink {
    getPrice() {
        return 0.6;
    }

    getCode() {
        return 'C'
    }
}