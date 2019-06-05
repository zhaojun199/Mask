import { combineEpics, ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax';
import { filter, mapTo, mergeMap, map } from 'rxjs/operators';

const pingEpic = action$ => action$.pipe(
  	filter(action => action.type === 'PING'),
  	mapTo({ type: 'PONG' })
);

// action creators
const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
const fetchUserFulfilled = payload => ({ type: 'demo/showText', payload, id: payload.id });

// epic
const fetchUserEpic = action$ => action$.pipe(
  	ofType('FETCH_USER'),
  	mergeMap(action =>
    	ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      		map(response => fetchUserFulfilled(response))
    	)
  	)
);

const rootEpic = combineEpics(pingEpic, fetchUserEpic)

export default rootEpic