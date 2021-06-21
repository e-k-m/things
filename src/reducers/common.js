import { APP_LOAD, LOGOUT, LOGIN, REGISTER } from "../actionTypes";

var defaultState = {
    appLoaded: false,
    token: null,
    currentUser: null,
    errors: null,
};

function common(state = defaultState, action) {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                appLoaded: action.token ? true : false,
                token: action.token ? action.token : null,
                currentUser: action.error ? null : action.payload,
                errors: action.error ? action.payload.errors : null,
            };
        case LOGOUT:
            return {
                ...defaultState,
            };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                appLoaded: action.error ? false : true,
                token: action.error ? null : action.payload.access_token,
                currentUser: action.error ? null : action.payload,
                errors: action.error ? action.payload.errors : null,
            };
        default:
            return state;
    }
}

export default common;
