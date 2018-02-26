import {
    applyMiddleware,
    createStore,
    combineReducers,
    compose,
} from "redux";

import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers/index";

let middleware = [thunkMiddleware];

if (__DEV__) {
    middleware = [
        ...middleware,
        createLogger(),
    ];
}

const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
)(createStore);

const reducer = combineReducers(rootReducer);

export const store = createStoreWithMiddleware(reducer);
export const persistor = persistStore(store);