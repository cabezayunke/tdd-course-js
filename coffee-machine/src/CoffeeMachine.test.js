import CoffeeMachine from "./CoffeeMachine";
import DrinkMaker from "./DrinkMaker";
import { DrinkPrices, Drinks } from "./Drinks"
import ExtraHotHandler from "./options/ExtraHotHandler";
import SeparatorHandler from "./options/SeparatorHandler";
import SugarHandler from "./options/SugarHandler";
import SugarStickHandler from "./options/SugarStickHandler";

describe('CoffeeMachine', () => { 

    let coffeeMachine;
    let drinkMakerSpy;

    describe('base drinks', () => {
        beforeEach(() => {
            const drinkMaker = new DrinkMaker();
            drinkMakerSpy = jest.spyOn(drinkMaker, 'execute');
            coffeeMachine = new CoffeeMachine(drinkMaker, new SeparatorHandler(new SeparatorHandler()));
        })

        test.each([
            { drink: Drinks.COFFEE, expectedResult: 'C::' },
            { drink: Drinks.TEA, expectedResult: 'T::' },
            { drink: Drinks.CHOCOLATE, expectedResult: 'H::' },
            { drink: Drinks.ORANGE_JUICE, expectedResult: 'O::' },
        ])('should receive correct command for $drink with 1€', ({ drink, expectedResult }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, 1);
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })
    
        test.each([
            { drink: Drinks.COFFEE, expectedResult: 'C::', moneyInput: 0.6 },
            { drink: Drinks.TEA, expectedResult: 'T::', moneyInput: 0.4 },
            { drink: Drinks.CHOCOLATE, expectedResult: 'H::', moneyInput: 0.5 },
            { drink: Drinks.ORANGE_JUICE, expectedResult: 'O::', moneyInput: 0.6 },
        ])('should receive correct command for $drink with the exact amount', ({ drink, expectedResult, moneyInput }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, moneyInput);
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })

        test.each([
            { drink: Drinks.COFFEE, expectedResult: 'M:0.4€ missing' },
            { drink: Drinks.TEA, expectedResult: 'M:0.2€ missing' },
            { drink: Drinks.CHOCOLATE, expectedResult: 'M:0.3€ missing' },
            { drink: Drinks.ORANGE_JUICE, expectedResult: 'M:0.4€ missing' },
        ])('should receive message command for $drink without enough money with 0,20€', ({ drink, expectedResult }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, 0.2);
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })
        
        test('should throw error for invalid drink', () => {
            // arrange
    
            // act
            
            // assert
            expect(() => coffeeMachine.make('invalid', 1)).toThrowError('Invalid drink');
        })
    })

    describe('drinks with sugar', () => {
        beforeEach(() => {
            const drinkMaker = new DrinkMaker();
            drinkMakerSpy = jest.spyOn(drinkMaker, 'execute');
            coffeeMachine = new CoffeeMachine(
                drinkMaker,
                new SeparatorHandler(
                    new SugarHandler(
                        new SeparatorHandler(
                            new SugarStickHandler()
                        )
                    )
                )
            );
        })

        test.each([
            { drink: Drinks.COFFEE, sugarCount: 1, expectedResult: 'C:1:0' },
            { drink: Drinks.COFFEE, sugarCount: 2, expectedResult: 'C:2:0' },
            { drink: Drinks.TEA, sugarCount: 1, expectedResult: 'T:1:0' },
            { drink: Drinks.TEA, sugarCount: 2, expectedResult: 'T:2:0' },
            { drink: Drinks.CHOCOLATE, sugarCount: 1, expectedResult: 'H:1:0' },
            { drink: Drinks.CHOCOLATE, sugarCount: 2, expectedResult: 'H:2:0' },
            { drink: Drinks.ORANGE_JUICE, sugarCount: 1, expectedResult: 'O:1:0' },
            { drink: Drinks.ORANGE_JUICE, sugarCount: 2, expectedResult: 'O:2:0' },
        ])('should receive correct command for $drink with $sugarCount sugar(s)', ({ drink, sugarCount, expectedResult }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, 1, { sugarCount });
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })
    })
   
    describe('drinks with extra hot option', () => {
        beforeEach(() => {
            const drinkMaker = new DrinkMaker();
            drinkMakerSpy = jest.spyOn(drinkMaker, 'execute');
            coffeeMachine = new CoffeeMachine(
                drinkMaker,
                new ExtraHotHandler(
                    new SeparatorHandler(
                        new SeparatorHandler()
                    )
                )
            );
        })

        test.each([
            { drink: Drinks.COFFEE, expectedResult: 'Ch::' },
            { drink: Drinks.TEA, expectedResult: 'Th::' },
            { drink: Drinks.CHOCOLATE, expectedResult: 'Hh::' },
        ])('should receive correct command for extra hot $drink', ({ drink, expectedResult }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, 1, { extraHot: true });
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })
    })

    describe('drinks with sugar', () => {
        beforeEach(() => {
            const drinkMaker = new DrinkMaker();
            drinkMakerSpy = jest.spyOn(drinkMaker, 'execute');
            coffeeMachine = new CoffeeMachine(drinkMaker);
        })

        test.each([
            { drink: Drinks.COFFEE, sugarCount: 1, expectedResult: 'Ch:1:0' },
            { drink: Drinks.COFFEE, sugarCount: 2, expectedResult: 'Ch:2:0' },
            { drink: Drinks.TEA, sugarCount: 1, expectedResult: 'Th:1:0' },
            { drink: Drinks.TEA, sugarCount: 2, expectedResult: 'Th:2:0' },
            { drink: Drinks.CHOCOLATE, sugarCount: 1, expectedResult: 'Hh:1:0' },
            { drink: Drinks.CHOCOLATE, sugarCount: 2, expectedResult: 'Hh:2:0' },
            { drink: Drinks.ORANGE_JUICE, sugarCount: 1, expectedResult: 'Oh:1:0' },
            { drink: Drinks.ORANGE_JUICE, sugarCount: 2, expectedResult: 'Oh:2:0' },
        ])('should receive correct command for $drink with $sugarCount sugar(s) and extra hot', ({ drink, sugarCount, expectedResult }) => {
            // arrange
    
            // act
            coffeeMachine.make(drink, 1, { sugarCount, extraHot: true });
    
            // assert
            expect(drinkMakerSpy).toHaveBeenCalledWith(expectedResult);
        })
    })

    
})