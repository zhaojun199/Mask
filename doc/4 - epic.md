## epic

epic与controller同理，通过一层封装和转化，改写成了简单语法

epic 处理副作用函数（ex: 网络请求）

epicClass -> epicClsToEpic -> conbineEpics -> epic

### demoEpic

``` 
import { mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'
import Epic from '@home/core/baseClass/Epic';

export default class ListEpic extends Epic{
	// epic命名空间,与controller ns 对应
	namespace = 'list';

	fetchList(action$) {
		return action$.pipe(
			mergeMap(({ payload }) =>
				http$.getJSON(`https://api.github.com/users/${payload.id}?param=${payload.id}`).pipe(
					map(response => {
						return {
							type: 'list/showList',
							payload: response,
						}
					})
				)
			)
		)
	}

}
 
``` 


### epicClsToEpic 


``` 
import { getClassName, getClassFunction } from '../util'

export default function epicClsToEpic(Epic) {
	const epics = {}
	const entry = new Epic()
	const epicNS = entry.namespace

	const actionsName = getClassFunction(entry)

	epics[epicNS] = actionsName.map(epic => {
		return function(action$) {
        	// epic会订阅action，匹配到对应type会执行订阅逻辑
			return entry[epic](action$.ofType(`${epicNS}/${epic}`))
		}
	})

	return epics
} 
``` 

