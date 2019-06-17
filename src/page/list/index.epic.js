import { combineEpics, ofType } from 'redux-observable'
import { filter, mapTo, mergeMap, map } from 'rxjs/operators'
import http$ from '@home/util/http'

// epic
const fetchListEpic = action$ => action$.pipe(
  	ofType('FETCH_LIST'),
  	mergeMap(action =>
    	http$.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      		map(response => ({ type: 'list/showList', response, id: response.id }))
    	)
  	)
);

const rootEpic = combineEpics(fetchListEpic)

export default rootEpic