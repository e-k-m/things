import {
    ASYNC_END,
    ASYNC_START,
    LOGIN_PAGE_UNLOADED,
    LOGIN,
    REGISTER_PAGE_UNLOADED,
    REGISTER,
    UPDATE_FIELD_AUTH,
} from "../actionTypes";

var defaultState = {
    username: null,
    email: null,
    password: null,
    inProgress: false,
    errors: null,
};

function auth(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
            };
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {};
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };
        case ASYNC_START:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                return { ...state, inProgress: true };
            }
            return state;
        case ASYNC_END:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                return { ...state, inProgress: false };
            }
            return state;
        default:
            return state;
    }
}

export default auth;
