import BaseOptionsHandler from "./BaseOptionsHandler";

export default class SugarHandler extends BaseOptionsHandler {
    constructor(nextHandler) {
        super(nextHandler);
    }

    getOptions(opts = {}) {
        const { sugarCount } = opts;
        const param = sugarCount ? `${sugarCount}` : '';
        return this.nextHandler 
            ? `${param}${this.nextHandler.getOptions(opts)}`
            : param;
    }
}