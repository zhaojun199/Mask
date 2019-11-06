import Controller from '@home/core/baseClass/Controller';

export default class DemoController extends Controller {

	namespace = 'demo';

	initial = {
		a: 1,
		b: 2,
	}

	showText(payload, state) {
		return payload;
	}
	showArrow = (payload, state) => {
		
	}
	static showStatic(payload, state) {
        
    }
}