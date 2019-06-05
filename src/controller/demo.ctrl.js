import jsonp from 'fetch-jsonp';

export default class demoController {
	namespace = 'demo';
	showText(params, state) {
		console.log(params, state);
		return params;
	}
	asyncText(params, state) {
		let r = jsonp(`https://suggest.taobao.com/sug?q=我&code=utf-8`)
      	.then(response => response.json());
		return r;
	}
	showArrow = (params, state) => {
		console.log(params, state);
	}
	static showStatic(params, state) {
        console.log(params, state);
    }
}