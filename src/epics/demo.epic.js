import { ofType } from 'redux-observable'
import { filter, mapTo, mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'

export default class DemoEpic {
	// epic命名空间,与controller ns 对应
	namespace = 'demo';

	fetchUserEpic(action$) {
		return action$.pipe(
			ofType('FETCH_USER'),
			mergeMap(action =>
				http$.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
					map(response => ({ type: 'demo/showText', response, id: response.id }))
				)
			)
		)
	}

	pingEpic(action$) {
		return action$.pipe(
			filter(action => action.type === 'PING'),
			mapTo({ type: 'PONG' })
		)
	}
}
