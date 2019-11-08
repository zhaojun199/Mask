import { combineEpics } from 'redux-observable'

import warning from 'warning'

import { getClassName, getClassFunction } from '../util'

export default function epicClsToEpic(Epic) {
	const epics = {}
	const entry = new Epic()
	const epicNS = entry.namespace
	warning(epicNS, `【${getClassName(entry)}】 - 未找到命名空间`)

	// warning(!this.usedNamespace.includes(epicNS), `【${getClassName(entry)}】-【${epicNS}】- 命名空间重复`)
	// this.usedNamespace.push(entry.namespace)

	const actionsName = getClassFunction(entry)

	epics[epicNS] = actionsName.map(epic => entry[epic])

	return epics
}