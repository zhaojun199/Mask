import { ofType } from 'redux-observable'
import { filter, mapTo, mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'
import Event from '@home/core/event'

const event = new Event()

export default class ListEpic {
	// epic命名空间,与controller ns 对应
	namespace = 'list';

	fetchList2(action$) {
		return action$.pipe(
			ofType('list/get2'),
			mergeMap(action =>
				http$.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
					map(response => {
						cout(event.getEvent('demo'))
						event
							.emitEvent('demo', 33, 55)
							.emitEvent('demo', 44, 66)
						return { type: 'list/showList', /*response, */id: response.id }
					})
				)
			)
		)
	}
}
