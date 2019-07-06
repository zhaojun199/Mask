class Report {
	static protected(e) {
		console.log(e)
	}
	static jsError(e) {
		console.log(e)
	}
	static promiseError(e) {
		console.log(e)
	}
	// 页面加载时间
	static speed(s) {
		console.log('%c speed time: ', 'color:#ec6e49;', s.time)
	}
	// dom数量
	static domCount(d) {
		console.log('%c dom count: ', 'color:#ec6e49;', d)
	}
	// xhr时间
	static xhr(x) {
		console.log('%c xhr time: ', 'color:#ec6e49;', x.time)
	}
}
window.$$report = Report

export default Report