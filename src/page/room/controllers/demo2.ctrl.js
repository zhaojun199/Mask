import Controller from '@home/core/baseClass/Controller';

export default class Demo2Controller extends Controller {

	namespace = 'demo2';

	initial = {
		a2: 1,
		b2: 2,
	}

	showText2(payload, state) {
		return payload;
	}
	showArrow2 = (payload, state) => {
		
	}
	static showStatic2(payload, state) {
        
    }
}