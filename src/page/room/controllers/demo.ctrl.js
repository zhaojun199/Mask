import Controller from '@home/core/baseClass/Controller';

export default class DemoController extends Controller {
    namespace = 'list';

    initial = {
        a: 1,
        b: 2,
    }

    showList({ payload }) {
        return payload;
    }
}
