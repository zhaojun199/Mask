import {
    mergeMap, map,
} from 'rxjs/operators';
import Epic from '@home/core/baseClass/Epic';

export default class ListEpic extends Epic {
    // epic命名空间,与controller ns 对应
    namespace = 'list';

    fetchList(action$) {
        return action$.pipe(
            mergeMap(({ payload }) => {
                return this.$http
                    .$send({
                        url: `https://api.github.com/users/${payload.id}?param=${payload.id}`,
                    }).pipe(
                        map((response) => ({
                            type: 'list/showList',
                            payload: response,
                        })),
                    )
            }),
        );
    }

    fetchListFromCache(action$) {
        return action$.pipe(
            mergeMap(() => {
                return this.$http
                    .$send({
                        url: 'https://api.github.com/users/1?param=1',
                        cache: true,
                    }).pipe(
                        map((response) => ({
                            type: 'list/showList',
                            payload: response,
                        })),
                    )
            }),
        );
    }
}
