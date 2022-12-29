import { Drinks } from "../Drinks"
import Chocolate from "./Chocolate";
import Coffee from "./Coffee"
import OrangeJuice from "./OrangeJuice";
import Tea from "./Tea";

export default class DrinkFactory {
    create(drink) {
        switch(drink) {
            case Drinks.COFFEE:
                return new Coffee();
            case Drinks.TEA:
                return new Tea();
            case Drinks.CHOCOLATE:
                return new Chocolate();
            case Drinks.ORANGE_JUICE:
                return new OrangeJuice();
            default:
                throw new Error('Invalid drink');
        }
    }
}