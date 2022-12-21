import ShopItem from "../ShopItem";

export default class GenericItem extends ShopItem {

    update() {
        this.decreaseSellIn();

        this.decreaseQuality(this.hasExpired() ? 2 : 1);
    }

}