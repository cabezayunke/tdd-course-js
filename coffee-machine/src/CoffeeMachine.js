import { DrinkPrices, Drinks } from "./Drinks";
import DrinkFactory from "./drinks/DrinkFactory";
import ExtraHotHandler from "./options/ExtraHotHandler";
import OptionsHandler from "./options/OptionsHandler";
import SeparatorHandler from "./options/SeparatorHandler";
import SugarHandler from "./options/SugarHandler";
import SugarStickHandler from "./options/SugarStickHandler";

export default class CoffeeMachine {
    constructor(drinkMaker, optionHandler) {
        this.drinkMaker = drinkMaker;
        this.drinkFactory = new DrinkFactory();
        
        this.optionHandler = optionHandler ?? new ExtraHotHandler(
            new SeparatorHandler(
                new SugarHandler(
                    new SeparatorHandler(
                        new SugarStickHandler()
                    )
                )
            )
        );
    }

    make(drink, moneyInput, opts) { 

        const drinkObj = this.drinkFactory.create(drink);
        const moneyDiff = this.checkMoneyDifference(drinkObj, moneyInput);
        const hasEnoughMoney = moneyDiff >= 0;
        const command = hasEnoughMoney
            ? this.buildDrinkCommand(drinkObj, opts)
            : this.buildMoneyMissingCommand(moneyDiff);
        this.drinkMaker.execute(command);
    }

    buildDrinkCommand(drink, opts) {
        const options = this.optionHandler.getOptions(opts); 
        return `${drink.getCode()}${options}`;
    }

    buildMessageCommand(message) {
        return `M:${message}`;
    }

    checkMoneyDifference(drink, moneyInput) {
        return moneyInput - drink.getPrice();
    }

    buildMoneyMissingCommand(moneyDiff) {
        return this.buildMessageCommand(
            `${this.formatMoneyDiff(moneyDiff)}€ missing`
        );
    }

    formatMoneyDiff(moneyDiff) {
        return Math.abs(moneyDiff).toFixed(1);
    }

}