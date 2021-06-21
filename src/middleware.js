import { ASYNC_START, ASYNC_END, LOGIN, LOGOUT, REGISTER } from "./actionTypes";
import agent from "./agent";

var promiseMiddleware = (store) => (next) => (action) => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then(
            (res) => {
                console.info("RESULT", res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, subtype: action.type, promise: action.payload });
                store.dispatch(action);
            },
            (error) => {
                console.error("ERROR", error);
                if (error.type !== undefined && error.status === 401) {
                    store.dispatch({ type: LOGOUT });
                    return;
                }

                if (error.type === undefined || error.type !== "application") {
                    error = new Error("Oops there seems to be a network issue.");
                }

                action.error = true;
                var errors = {};
                errors[error.message] = error.message;
                action.payload = { errors: errors };
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

var localStorageMiddleware = (store) => (next) => (action) => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error) {
            storeToken(action.payload.accessToken);
            setToken(action.payload.accessToken);
        }
    } else if (action.type === LOGOUT) {
        storeRemoveToken();
        setToken(null);
    }

    next(action);
};

function setToken(accessToken) {
    agent.setAccessToken(accessToken);
}

function storeToken(accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
}

function storeRemoveToken() {
    window.localStorage.removeItem("accessToken");
}

function isPromise(v) {
    return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
