export default class BaseOptionsHandler {
    constructor(nextHandler) {
        this.nextHandler = nextHandler;
    }

    getOptions(options) {
        throw new Error('not implemented');
    }
}