const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export default class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    increaseQuality() {
        if (this.quality < MAX_QUALITY) {
            this.quality = this.quality + 1;
        }
    }

    decreaseQuality() {
        if (this.quality > MIN_QUALITY) {
            this.quality = this.quality - 1;
        }
    }

    decreaseSellIn() {
        this.sellIn = this.sellIn - 1;
    }
}
