// 获取class的名字
export function getClassName(obj) {    
    if (obj && obj.constructor && obj.constructor.toString()) {      
        if (obj.constructor.name) {
        	return obj.constructor.name;
        }      
        let str = obj.constructor.toString();      
        let arr;      
        if (str.charAt(0) === '[') {        
            arr = str.match(/\w+\s*(\w+)/);      
        } else {
        	arr = str.match(/function\s*(\w+)/);
        }      
        if (arr && arr.length === 2) {
        	return arr[1];
        }    
    }    
    return undefined;   
}
// 获取class下的所有属性（不包含contructor）
export function getClassAllKeys(cls) {
	// 获取原型上的属性
	const prototype = Object.getPrototypeOf(cls);
	const prototypeNames = Object.getOwnPropertyNames(prototype);
	const prototypeNamesWithoutContructor = prototypeNames
		.filter((it) => {
			return it !== 'constructor';
		});
	// 获取自有的属性
	const ownNames = Object.keys(cls);
	const keys = [
		...prototypeNamesWithoutContructor,
		...ownNames,
	];
	return keys;
}
// 获取class下的所有方法（不包含contructor）
export function getClassFunction(cls) {
	// 获取原型上的属性
	const prototype = Object.getPrototypeOf(cls);
	const prototypeNames = Object.getOwnPropertyNames(prototype);
	const prototypeNamesWithoutContructor = prototypeNames
	// 获取自有的属性
	const ownNames = Object.keys(cls);
	const keys = [
		...prototypeNames,
		...ownNames,
	];
	const keysOnlyFunc = keys
		.filter((it) => {
			if (it === 'constructor') {
				return false;
			}
			if (typeof cls[it] === 'function') {
				return true;
			}
			return false;
		});
	return keysOnlyFunc;
}
// 判断是否是promise
export function assertIsPromise(obj) {
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}