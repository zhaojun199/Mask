export default class ListController {
	namespace = 'list';
	showList(params, state) {
		console.log(params, state);
		return params;
	}
}
