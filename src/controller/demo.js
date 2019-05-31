export default class demoController {
	namespace = 'demo';
	showText(params, state) {
		console.log(params, state);
		return params;
	}
	showArrow = (params, state) => {
		console.log(params, state);
	}
	static showStatic(params, state) {
        console.log(params, state);
    }
}