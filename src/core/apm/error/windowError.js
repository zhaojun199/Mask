import report from '../report/report'

// 捕获全局异常
window.addEventListener('error', function(event) {
	// event.preventDefault() 	//	阻止error在控制台报错
	// report to sever
	report.jsError(event)
})

// 捕获promise异常
window.addEventListener('unhandledrejection', function(event) {
	// event.preventDefault() 	//	阻止error在控制台报错
	// report to sever
	report.promiseError(event)
})