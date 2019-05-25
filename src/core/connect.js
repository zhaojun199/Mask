import Dispatch from './Dispatch';

export default function(modelMap = {}) {
	const props = {
		...modelMap,
	}
	return function(component) {
		<component {...props} />
	}
}