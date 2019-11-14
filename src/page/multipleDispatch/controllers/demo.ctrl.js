import Controller from '@home/core/baseClass/Controller';

export default class DemoController extends Controller {

	namespace = 'list';

	initial = {
		id: -1,
		uid: 2,
	}

	getList({ payload }, state) {
		return payload;
	}
	getList2({ payload }, state) {
		return payload;
	}
	static showStatic(payload, state) {
        
    }
}