import BaseDrink from "./BaseDrink";

export default class OrangeJuice extends BaseDrink {
    getPrice() {
        return 0.6;
    }

    getCode() {
        return 'O'
    }
}