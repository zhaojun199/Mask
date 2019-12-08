import combineEpics from '@home/core/combineEpics';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

export const stores = {};

export default function configureStore({
    preloadedState,
    middlewares,
    epics,
    enhancers = [],
    reducers,
}) {
    return function ({ name, http }) {
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

        const store = createStore(reducers, preloadedState, composedEnhancers);

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
