import Shop from './Shop';
import Item from './Item';

const createShop = ({ itemName, sellIn, quality }) => {
    const shop = new Shop([new Item(itemName, sellIn, quality)]);
    return shop;
};

const createShopWithGenericItem = args =>
    createShop({ itemName: 'foo', ...args });

const createShopWithAgedBrie = args =>
    createShop({ itemName: 'Aged Brie', ...args });

const createShopWithSulfuras = args =>
    createShop({ itemName: 'Sulfuras, Hand of Ragnaros', ...args });

const createShopWithBackstagePasses = args =>
    createShop({
        itemName: 'Backstage passes to a TAFKAL80ETC concert',
        ...args,
    });

const createShopWithConjuredItem = args =>
    createShop({ itemName: 'Conjured', ...args });

describe('Gilded rose shop', () => {
    describe('generic items behaviour', () => {
        test('item should decrease quality by 1 after 1 day', () => {
            const shop = createShopWithGenericItem({ sellIn: 1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(2);
        });

        test('item should decrease expired date by 1 after 1 day', () => {
            const shop = createShopWithGenericItem({ sellIn: 1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.sellIn).toEqual(0);
        });

        test('item should keep decreasing quality by 1 after expired date', () => {
            const shop = createShopWithGenericItem({ sellIn: -1, quality: 1 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(0);
        });

        test('should decrease quality by 2 once the item has expired', () => {
            const shop = createShopWithGenericItem({ sellIn: -1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(1);
        });

        test('should never decrease quality below 0', () => {
            const shop = createShopWithGenericItem({ sellIn: 0, quality: 0 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(0);
        });
    });

    describe('Special items: Sulfuras', () => {
        test('item should not decrease quality once the item has expired', () => {
            const shop = createShopWithSulfuras({ sellIn: -1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(3);
        });

        test('item should never be sold and never decrease quality', () => {
            // arrange
            const shop = createShopWithSulfuras({ sellIn: 1, quality: 5 });

            const [item] = shop.updateInventory();

            // assert
            expect(item.sellIn).toEqual(1);
            expect(item.quality).toEqual(5);
        });
    });

    describe('Special items: Aged Brie', () => {
        test('should increase quality as time goes by instead of decreasing', () => {
            // arrange
            const shop = createShopWithAgedBrie({ sellIn: 1, quality: 1 });

            const [item] = shop.updateInventory();

            // assert
            expect(item.quality).toEqual(2);
        });

        test('should increase quality by 2 once it has expired', () => {
            // arrange
            const shop = createShopWithAgedBrie({ sellIn: -1, quality: 1 });

            const [item] = shop.updateInventory();

            // assert
            expect(item.quality).toEqual(3);
        });

        test.each([49, 50])(
            'should increase should not go above 50 even when expired',
            quality => {
                // arrange
                const shop = createShopWithAgedBrie({ sellIn: -1, quality });

                const [item] = shop.updateInventory();

                // assert
                expect(item.quality).toEqual(50);
            }
        );
    });

    describe('Special items: Backstage passes', () => {
        test('should increase quality by 1 as time goes by and expired date is over 10 days', () => {
            // arrange
            const shop = createShopWithBackstagePasses({
                sellIn: 11,
                quality: 5,
            });

            const [item] = shop.updateInventory();

            // assert
            expect(item.quality).toEqual(6);
        });

        test.each([6, 10])(
            'should increase quality by 2 when expired date is between 5 and 10 days',
            sellIn => {
                // arrange
                const shop = createShopWithBackstagePasses({
                    sellIn,
                    quality: 5,
                });

                const [item] = shop.updateInventory();

                // assert
                expect(item.quality).toEqual(7);
            }
        );

        test.each([1, 5])(
            'should increase quality by 3 when expired date is between 1 and 5 days',
            sellIn => {
                // arrange
                const shop = createShopWithBackstagePasses({
                    sellIn,
                    quality: 5,
                });

                const [item] = shop.updateInventory();

                // assert
                expect(item.quality).toEqual(8);
            }
        );

        test('should drop quality to 0 after the concert date', () => {
            // arrange
            const shop = createShopWithBackstagePasses({
                sellIn: 0,
                quality: 5,
            });

            const [item] = shop.updateInventory();

            // assert
            expect(item.quality).toEqual(0);
        });

        test.each([
            { sellIn: 10, quality: 49 },
            { sellIn: 5, quality: 48 },
            { sellIn: 11, quality: 50 },
        ])(
            'should never increase quality above 50 (sellIn: $sellIn, quality: $quality)',
            ({ sellIn, quality }) => {
                // arrange
                const shop = createShopWithBackstagePasses({
                    sellIn,
                    quality,
                });

                const [item] = shop.updateInventory();

                // assert
                expect(item.quality).toEqual(50);
            }
        );
    });

    describe('Special items: Cojured', () => {
        test('item should decrease quality by 2 after 1 day', () => {
            const shop = createShopWithConjuredItem({ sellIn: 1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(1);
        });

        test('item should decrease expired date by 1 after 1 day', () => {
            const shop = createShopWithConjuredItem({ sellIn: 1, quality: 3 });

            const [item] = shop.updateInventory();

            expect(item.sellIn).toEqual(0);
        });

        test('item should keep decreasing quality by 1 after expired date', () => {
            const shop = createShopWithConjuredItem({ sellIn: -1, quality: 1 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(0);
        });

        test('should decrease quality by 4 once the item has expired', () => {
            const shop = createShopWithConjuredItem({ sellIn: -1, quality: 5 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(1);
        });

        test('should never decrease quality below 0', () => {
            const shop = createShopWithConjuredItem({ sellIn: 0, quality: 1 });

            const [item] = shop.updateInventory();

            expect(item.quality).toEqual(0);
        });
    });
});
