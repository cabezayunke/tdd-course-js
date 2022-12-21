import ShopItem from "../ShopItem";

export default class Conjured extends ShopItem {

    update() {
        this.decreaseSellIn();

        this.decreaseQuality(this.hasExpired() ? 4 : 2);
    }

}