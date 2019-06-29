import jsonp from 'fetch-jsonp';

export default class DemoController {
	namespace = 'demo';
	showText(params, state) {
		return params;
	}
	asyncText(params, state) {
		let r = jsonp(`https://suggest.taobao.com/sug?q=我&code=utf-8`)
      	.then(response => response.json());
		return r;
	}
	showArrow = (params, state) => {
		
	}
	static showStatic(params, state) {
        
    }
}