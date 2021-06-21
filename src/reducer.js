import { combineReducers } from "redux";

import auth from "./reducers/auth";
import common from "./reducers/common";
import current from "./reducers/current";
import todos from "./reducers/todos";

var reducer = combineReducers({
    auth,
    common,
    current,
    todos,
});

export default reducer;
