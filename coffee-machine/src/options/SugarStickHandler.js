import BaseOptionsHandler from "./BaseOptionsHandler";

export default class SugarStickHandler extends BaseOptionsHandler {
    constructor(nextHandler) {
        super(nextHandler);
    }

    getOptions(opts = {}) {
        const { sugarCount } = opts;
        const param = sugarCount ? '0' : '';
        return this.nextHandler 
            ? `${param}:${this.nextHandler.getOptions(opts)}`
            : param;
    }
}