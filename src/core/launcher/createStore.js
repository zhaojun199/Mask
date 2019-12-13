import combineEpics from '@home/core/combineEpics';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

export const stores = {};

export default function configureStore({
    preloadedState,
    middlewares,
    epics,
    enhancers = [],
    reducers,
}) {
    return function ({ name, http, persist }) {
        // 处理epics
        let epicMiddleware;
        let mergedMiddlewares;
        if (epics) {
            epicMiddleware = createEpicMiddleware();
            mergedMiddlewares = [...middlewares, epicMiddleware];
        } else {
            mergedMiddlewares = [...middlewares];
        }

        const middlewareEnhancer = applyMiddleware(...mergedMiddlewares);

        const mergedEnhancers = [middlewareEnhancer, ...enhancers];
        const composedEnhancers = compose(...mergedEnhancers);

        // 处理persist
        let reducersTrans = reducers;
        let persistConfig;
        if (persist) {
            persistConfig = {
                key: name,
                storage: storage,
                stateReconciler: autoMergeLevel2,
                ...(persist === true ? {} : persist),
            };
            reducersTrans = persistReducer(persistConfig, reducers);
        }

        const store = createStore(
            reducersTrans,
            preloadedState,
            composedEnhancers
        );

        if (epics) {
            const originalEpics = combineEpics(http)(...epics);
            epicMiddleware.run(originalEpics);
        }

        store.reducers = reducers;
        store.name = name;
        stores[name] = store;

        return store;
    };
}
