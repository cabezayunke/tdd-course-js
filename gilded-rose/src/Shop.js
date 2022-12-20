const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

export default class Shop {
    constructor(someItems) {
        this.items = someItems;
    }

    updateInventory() {
        for (const item of this.items) {
            this.updateItem(item);
        }

        return this.items;
    }

    updateItem(item) {
        if (item.name === SULFURAS) {
            return;
        }

        if (item.name === AGED_BRIE) {
            this.updateAgedBrie(item);
        } else if (item.name === BACKSTAGE_PASSES) {
            this.updateBackstagePasses(item);
        } else if (item.name === CONJURED) {
            this.updateConjured(item);
        } else {
            this.updateGenericItem(item);
        }
    }

    updateGenericItem(item) {
        item.decreaseQuality();

        item.decreaseSellIn();

        if (item.sellIn < 0) {
            item.decreaseQuality();
        }
    }

    updateAgedBrie(item) {
        item.decreaseSellIn();

        item.increaseQuality();

        if (item.sellIn < 0) {
            item.increaseQuality();
        }
    }

    updateBackstagePasses(item) {
        item.increaseQuality();

        if (item.sellIn < 11) {
            item.increaseQuality();
        }

        if (item.sellIn < 6) {
            item.increaseQuality();
        }

        item.decreaseSellIn();

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    updateConjured(item) {
        item.decreaseQuality();
        item.decreaseQuality();

        item.decreaseSellIn();

        if (item.sellIn < 0) {
            item.decreaseQuality();
            item.decreaseQuality();
        }
    }
}
