import AgedBrie from "./items/AgedBrie";
import BackstagePass from "./items/BackstagePass";
import Conjured from "./items/Conjured";
import Sulfuras from "./items/Sulfuras";
import GenericItem from "./items/GenericItem";

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

const mapItemToShopItem = (item) => {
    switch(item.name) {
        case AGED_BRIE:
            return new AgedBrie(item);
        case BACKSTAGE_PASSES:
            return new BackstagePass(item);
        case CONJURED:
            return new Conjured(item);
        case SULFURAS:
            return new Sulfuras(item);
        default:
            return new GenericItem(item);
    }    
}

const mapShopItemToItem = (shopItem) => shopItem.item;

export { mapItemToShopItem, mapShopItemToItem };