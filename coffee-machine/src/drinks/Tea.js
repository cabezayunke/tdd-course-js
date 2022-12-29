import BaseDrink from "./BaseDrink";

export default class Tea extends BaseDrink {
    getPrice() {
        return 0.4;
    }

    getCode() {
        return 'T'
    }
}