import {
    mergeMap, map,
} from 'rxjs/operators';
import http$ from '@home/util/http';

export default class UserEpic {
    // epic命名空间,与controller ns 对应
    namespace = 'user';

    fetchUser(action$) {
        return action$.pipe(
            mergeMap((action) => http$.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
                map((response) => ({ type: 'user/saveUser', payload: response })),
            )),
        );
    }
}
