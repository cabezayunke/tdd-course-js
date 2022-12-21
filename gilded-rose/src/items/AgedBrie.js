import ShopItem from "../ShopItem";

export default class AgedBrie extends ShopItem {

    update() {
        this.decreaseSellIn();

        this.increaseQuality(this.hasExpired() ? 2 : 1);
    }

}