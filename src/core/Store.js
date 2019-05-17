// 数据池，单例
let instance;
Class Store {
	constructor() {
		if (instance) {
			return instance;
		}
		return this.dataCenter;
	}
	// 数据存储中心
	dataCenter = {};

	setData(key, value) {
		this.dataCenter[key] = value;
	}

	getData(key) {
		return this.dataCenter[key];
	}
}

export default Store;