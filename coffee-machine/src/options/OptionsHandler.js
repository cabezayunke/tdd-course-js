export default class OptionsHandler {

    getOptions({ sugarCount, extraHot } = {}) {
        let params = extraHot ? 'h:' : ':';
        if (sugarCount) {
            params += `${sugarCount}:0`
        } else {
            params += ':'
        }
        return params;
    }
}