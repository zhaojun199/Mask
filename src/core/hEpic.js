import { combineEpics } from 'redux-observable'

import warning from 'warning'

import demo from '@home/epics/demo.epic'
import { getClassName, getClassFunction, assertIsPromise } from './util'

// 单例模式
let instance
class Hepic {
	constructor() {
		if (instance) {
			return instance
		}
		instance = this
		return instance
	}

	epics = {
	}

	usedNamespace = []

	extraEpic(Epic) {
		const entry = new Epic()
		const epicNS = entry.namespace
		warning(epicNS, `【${getClassName(entry)}】 - 未找到命名空间`)
		warning(!this.usedNamespace.includes(epicNS), `【${getClassName(entry)}】-【${epicNS}】- 命名空间重复`)
		this.usedNamespace.push(entry.namespace)
		const actionsName = getClassFunction(entry)
		this.epics[epicNS] = actionsName.map(epic => entry[epic])
	}

	getEpics(namespace) {
		if (namespace) {
			return combineEpics(...this.epics[namespace])
		}
		return combineEpics(
			...Object.values(this.epics).reduce((a, b) => a.concat(b), [])
		)
	}
}

export default new Hepic()