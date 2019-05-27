export default class demoController {
	namespace = 'demo';
	showText(params, state) {
		console.log(params, state);
	}
	showArrow = (params, state) => {
		console.log(params, state);
	}
	static showStatic(params, state) {
        console.log(params, state);
    }
}