const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export default class ShopItem {
    constructor(item) {
        this.item = item;
    }

    update() {
        throw new Error('Implement this in subclass please')
    }

    increaseQuality(times = 1) {
        this.item.quality = Math.min(this.item.quality + times, MAX_QUALITY);
    }

    decreaseQuality(times = 1) {
        this.item.quality = Math.max(this.item.quality - times, MIN_QUALITY);
    }

    decreaseSellIn() {
        this.item.sellIn = this.item.sellIn - 1;
    }

    hasExpired() {
        return this.item.sellIn < 0;
    }
}
