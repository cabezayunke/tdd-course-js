import Shop from "./Shop";
import Item from "./Item";

describe('Gilded rose shop', () => {

  describe('generic items behaviour', () => { 
    test("item should decrease quality by 1 after 1 day", () => {
      const item = new Item("foo", 1, 3);
      const shop = new Shop([item]);
  
      shop.updateQuality();
  
      expect(item.quality).toEqual(2);
    });
  
    test("item should keep decreasing quality by 1 after expired date", () => {
      const item = new Item("foo", -1, 1);
      const shop = new Shop([item]);
  
      shop.updateQuality();
  
      expect(item.quality).toEqual(0);
    });

    test('should decrease quality by 2 once the item has expired', () => { 
      const item = new Item("foo", -1, 3);
      const shop = new Shop([item]);
  
      shop.updateQuality();
  
      expect(item.quality).toEqual(1);
    });

    test('should never decrease quality below 0', () => { 
      const item = new Item("foo", 0, 0);
      const shop = new Shop([item]);
  
      shop.updateQuality();
  
      expect(item.quality).toEqual(0);
    });
  });
  

 describe('Special items: Sulfuras', () => { 
  test('should not decrease quality by 2 once the item has expired if Sulfuras', () => { 
    const item = new Item("Sulfuras, Hand of Ragnaros", -1, 3);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toEqual(3);
  })

  test('Sulfuras item should never be sold and never decrease quality', () => {
    // arrange
    const item = new Item("Sulfuras, Hand of Ragnaros", 1, 5);
    const shop = new Shop([item]);

    // act
    shop.updateQuality();

    // assert
    expect(item.quality).toEqual(5);
  })
 })

 describe('Special items: Aged Brie', () => {
  test('Aged Brie increases quality as time goes by instead of decreasing', () => { 
    // arrange
    const item = new Item("Aged Brie", 1, 1);
    const shop = new Shop([item]);

    // act
    shop.updateQuality();

    // assert
    expect(item.quality).toEqual(2);
  })

  test('Aged Brie increases quality by 2 once it has expired', () => { 
    // arrange
    const item = new Item("Aged Brie", -1, 1);
    const shop = new Shop([item]);

    // act
    shop.updateQuality();

    // assert
    expect(item.quality).toEqual(3);
  })

  test('Aged Brie quality should not go above 50 even when expired', () => { 
    // arrange
    const item = new Item("Aged Brie", -1, 49);
    const shop = new Shop([item]);

    // act
    shop.updateQuality();

    // assert
    expect(item.quality).toEqual(50);
  })

  test('Aged Brie should never increase quality above 50', () => { 
    // arrange
    const item = new Item("Aged Brie", 1, 50);
    const shop = new Shop([item]);

    // act
    shop.updateQuality();

    // assert
    expect(item.quality).toEqual(50);
  })
 })

 describe('Special items: Backstage passes', () => { 
  test('Backstage passes should increase quality by 1 as time goes by and expired date is over 10 days', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(6);
    })

    test('Backstage passes should increase quality by 2 when expired date is between 5 and 10 days', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(7);
    })

    test('Backstage passes should increase quality by 3 when expired date is between 1 and 5 days', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(8);
    })

    test('Backstage passes should drop quality to 0 after the concert date', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(0);
    })

    test('Backstage passes should never increase quality above 50 when expired date is 10', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(50);
    })

    test('Backstage passes should never increase quality above 50 when expired date is 5', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(50);
    })

    test('Backstage passes should never increase quality above 50 when expired date is 11', () => { 
      // arrange
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50);
      const shop = new Shop([item]);

      // act
      shop.updateQuality();

      // assert
      expect(item.quality).toEqual(50);
    })
  })

  

  

  
});