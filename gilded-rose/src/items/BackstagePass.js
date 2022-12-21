import ShopItem from "../ShopItem";

export default class BackstagePass extends ShopItem {

    update() {
        if (this.item.sellIn > 10) {
            this.increaseQuality(1);
        } else if (this.item.sellIn > 5) {
            this.increaseQuality(2);
        } else {
            this.increaseQuality(3);
        }

        this.decreaseSellIn();

        if (this.hasExpired()) {
            this.item.quality = 0;
        } 
    }

}