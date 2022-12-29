import BaseOptionsHandler from "./BaseOptionsHandler";

export default class ExtraHotHandler extends BaseOptionsHandler {
    constructor(nextHandler) {
        super(nextHandler);
    }

    getOptions(opts = {}) {
        const { extraHot } = opts;
        const param = extraHot ? 'h' : '';
        return this.nextHandler 
            ? `${param}${this.nextHandler.getOptions(opts)}`
            : param;
    }
}