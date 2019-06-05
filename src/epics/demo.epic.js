import { combineEpics, ofType } from 'redux-observable'
import { filter, mapTo, mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'

const pingEpic = action$ => action$.pipe(
  	filter(action => action.type === 'PING'),
  	mapTo({ type: 'PONG' })
);

// epic
const fetchUserEpic = action$ => action$.pipe(
  	ofType('FETCH_USER'),
  	mergeMap(action =>
    	http$.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      		map(response => ({ type: 'demo/showText', response, id: response.id }))
    	)
  	)
);

const rootEpic = combineEpics(pingEpic, fetchUserEpic)

export default rootEpic