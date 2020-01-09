import Controller from '@home/core/baseClass/Controller';

export default class Demo2Controller extends Controller {
    namespace = 'demo2';

    initial = {
    }

    showText2(payload) {
        return payload;
    }
}
