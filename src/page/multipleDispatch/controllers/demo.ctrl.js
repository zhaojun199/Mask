import Controller from '@home/core/baseClass/Controller';

export default class DemoController extends Controller {
    namespace = 'list';

    initial = {
        id: -1,
        uid: 2,
    }

    getList({ payload }) {
        return payload;
    }
}
