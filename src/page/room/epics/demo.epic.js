import { ofType } from 'redux-observable'
import { filter, mapTo, mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'
import Event from '@home/core/event'

const event = new Event()

export default class ListEpic {
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

	// pingEpic(action$) {
	// 	return action$.pipe(
	// 		filter(action => action.type === 'PING'),
	// 		mapTo({ type: 'PONG' })
	// 	)
	// }
}
