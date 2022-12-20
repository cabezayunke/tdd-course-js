import Shop from "./Shop";
import Item from "./Item";

const createShop = ({ itemName, sellIn, quality }) => {
  const shop = new Shop([
    new Item(itemName, sellIn, quality)
  ]);
  return shop;
}

const createShopWithGenericItem = (args) => createShop({ itemName: 'foo', ...args});
const createShopWithAgedBrie = (args) => createShop({ itemName: 'Aged Brie', ...args});
const createShopWithSulfuras = (args) => createShop({ itemName: 'Sulfuras, Hand of Ragnaros', ...args});
const createShopWithBackstagePasses = (args) => createShop({ itemName: 'Backstage passes to a TAFKAL80ETC concert', ...args});

describe('Gilded rose shop', () => {

  describe('Expired date management', () => { 
    test('should decrease by 1 for generic items', () => {
      const shop = createShopWithGenericItem({ sellIn: 1, quality: 3 });
    
      const [item] = shop.updateQuality();
  
      expect(item.sellIn).toEqual(0);
    })

    test('should not decrease for Sulfuras', () => {
      const shop = createShopWithSulfuras({ sellIn: 1, quality: 3 });
    
      const [item] = shop.updateQuality();
  
      expect(item.sellIn).toEqual(1);
    })
  })

  describe('Quality management', () => {
    describe('generic items behaviour', () => { 
      test("item should decrease quality by 1 after 1 day", () => {
        const shop = createShopWithGenericItem({ sellIn: 1, quality: 3 });
    
        const [item] = shop.updateQuality();
    
        expect(item.quality).toEqual(2);
      });
    
      test("item should keep decreasing quality by 1 after expired date", () => {
        const shop = createShopWithGenericItem({ sellIn: -1, quality: 1 });
    
        const [item] = shop.updateQuality();
    
        expect(item.quality).toEqual(0);
      });
  
      test('should decrease quality by 2 once the item has expired', () => { 
        const shop = createShopWithGenericItem({ sellIn: -1, quality: 3 });
    
        const [item] = shop.updateQuality();
    
        expect(item.quality).toEqual(1);
      });
  
      test('should never decrease quality below 0', () => { 
        const shop = createShopWithGenericItem({ sellIn: 0, quality: 0 });
    
        const [item] = shop.updateQuality();
  
        expect(item.quality).toEqual(0);
      });
    });
    
  
   describe('Special items: Sulfuras', () => { 
  
    test.each([
      { title: 'not decrease quality once the item has expired', sellIn: -1, quality: 3, expectedQuality: 3 },
      // { title: 'never be sold and never decrease quality', sellIn: 1, quality: 5, expectedQuality: 5 },
  
    ])('should $title', ({ sellIn, quality, expectedQuality }) => {
      // arrange
      const shop = createShopWithSulfuras({ sellIn, quality });
        
      const [item] = shop.updateQuality();
  
      // assert
      expect(item.quality).toEqual(expectedQuality);
    })
   })
  
   describe('Special items: Aged Brie', () => {
    test.each([
      { title: 'increase quality as time goes by instead of decreasing', sellIn: 1, quality: 1, expectedQuality: 2 },
      { title: 'increase quality by 2 once it has expired', sellIn: -1, quality: 1, expectedQuality: 3 },
      { title: 'increase should not go above 50 even when expired', sellIn: -1, quality: 49, expectedQuality: 50 },
      { title: 'never increase quality above 50', sellIn: 1, quality: 50, expectedQuality: 50 },
  
    ])('should $title', ({ sellIn, quality, expectedQuality }) => {
      // arrange
      const shop = createShopWithAgedBrie({ sellIn, quality });
        
      const [item] = shop.updateQuality();
  
      // assert
      expect(item.quality).toEqual(expectedQuality);
    })
  
   })
  
   describe('Special items: Backstage passes', () => { 
  
    test.each([
      { title: 'increase quality by 1 as time goes by and expired date is over 10 days', sellIn: 11, quality: 5, expectedQuality: 6 },
      { title: 'increase quality by 2 when expired date is between 5 and 10 days (10)', sellIn: 10, quality: 5, expectedQuality: 7 },
      { title: 'increase quality by 2 when expired date is between 5 and 10 days (6)', sellIn: 6, quality: 5, expectedQuality: 7 },
      // { title: 'increase quality by 3 when expired date is between 1 and 5 days (5)', sellIn: 5, quality: 5, expectedQuality: 8 },
      { title: 'increase quality by 3 when expired date is between 1 and 5 days (1)', sellIn: 1, quality: 5, expectedQuality: 8 },
      // { title: 'drop quality to 0 after the concert date', sellIn: 0, quality: 5, expectedQuality: 0 },
      { title: 'drop quality to 0 after the concert date', sellIn: -1, quality: 5, expectedQuality: 0 },
      { title: 'never increase quality above 50 when expired date is 10', sellIn: 10, quality: 49, expectedQuality: 50 },
      // { title: 'never increase quality above 50 when expired date is 6', sellIn: 6, quality: 49, expectedQuality: 50 },
      { title: 'never increase quality above 50 when expired date is 5', sellIn: 5, quality: 48, expectedQuality: 50 },
      // { title: 'never increase quality above 50 when expired date is 1', sellIn: 1, quality: 48, expectedQuality: 50 },
      // { title: 'never increase quality above 50 when expired date is 11', sellIn: 11, quality: 50, expectedQuality: 50 },
  
    ])('should $title', ({ sellIn, quality, expectedQuality }) => { 
        // arrange
        const shop = createShopWithBackstagePasses({ sellIn, quality });
    
        const [item] = shop.updateQuality();
  
        // assert
        expect(item.quality).toEqual(expectedQuality);
      })
    })
    
  })
  
});