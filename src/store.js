import { createStore, applyMiddleware } from "redux";

import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import reducer from "./reducer";

var store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export { store };
