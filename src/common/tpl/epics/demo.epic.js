import {
    mergeMap, map,
} from 'rxjs/operators';
import http$ from '@home/util/http';
import Epic from '@home/core/baseClass/Epic';

export default class ListEpic extends Epic {
    // epic命名空间,与controller ns 对应
    namespace = 'list';

    fetchList(action$) {
        return action$.pipe(
            mergeMap(({ payload }) => http$.getJSON(`https://api.github.com/users/${payload.id}?param=${payload.id}`).pipe(
                map((response) => ({
                    type: 'list/showList',
                    payload: response,
                })),
            )),
        );
    }

    // pingEpic(action$) {
    //     return action$.pipe(
    //         filter(action => action.type === 'PING'),
    //         mapTo({ type: 'PONG' })
    //     )
    // }
}
