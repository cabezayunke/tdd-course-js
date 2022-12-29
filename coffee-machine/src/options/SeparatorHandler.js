import BaseOptionsHandler from "./BaseOptionsHandler";

export default class SeparatorHandler extends BaseOptionsHandler {
    constructor(nextHandler) {
        super(nextHandler);
    }

    getOptions(opts = {}) {
        const param = ':';
        return this.nextHandler 
            ? `${param}${this.nextHandler.getOptions(opts)}`
            : param;
    }
}