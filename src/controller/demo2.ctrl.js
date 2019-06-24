export default class Demo2Controller {
	namespace = 'demo2';
	showText2(params, state) {
		console.log(params, state);
	}
	showArrow2 = (params, state) => {
		console.log(params, state);
	}
	static showStatic2(params, state) {
        console.log(params, state);
    }
}