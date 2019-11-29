import Controller from '@home/core/baseClass/Controller';

export default class Demo2Controller extends Controller {
    namespace = 'demo2';

    initial = {
        a2: 1,
        b2: 2,
    }

    showText2(payload) {
        return payload;
    }
}
