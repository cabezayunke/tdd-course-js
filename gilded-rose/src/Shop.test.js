import Shop from "./Shop";
import Item from "./Item";

describe('Gilded rose shop', () => {
  test("random item should decrease quality by 1 after 1 day", () => {
    const item = new Item("foo", 1, 3);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toEqual(2);
  });

  test('should decrease quality by 2 once the item has expired', () => { 
    const item = new Item("foo", 0, 3);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toEqual(1);
  })

  test('should never decrease quality below 0', () => { 
    const item = new Item("foo", 0, 0);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toEqual(0);
   })
});