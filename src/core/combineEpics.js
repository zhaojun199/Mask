import warning from 'warning'
import { combineEpics as ce } from 'redux-observable'
import epicClsToEpic from './mapFunction/epicClsToEpic'

export default function combineEpics(...epicClses) {

	let epics = []

	epicClses.forEach(epicCls => {
		epics.push(Object.values(epicClsToEpic(epicCls)));
	})

	const epicsFlat1 = epics.flat();

	warning(
		epicsFlat1.length === epicClses.length,
		`同一应用命名空间必须唯一`
		)

	const epicsFlat2 = epicsFlat1.flat();

	return ce(...epicsFlat2)

}