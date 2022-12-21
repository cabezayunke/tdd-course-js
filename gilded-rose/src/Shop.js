import { mapItemToShopItem, mapShopItemToItem } from "./ItemMapper";

export default class Shop {
    constructor(someItems) {
        this.items = someItems.map(mapItemToShopItem);
    }

    updateInventory() {
        for (const shopItem of this.items) {
            shopItem.update();
        }

        return this.items.map(mapShopItemToItem);
    }
}
