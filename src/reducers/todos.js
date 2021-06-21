import {
    ADD_TODO,
    APPLY_ACTIVE_FILTER,
    APPLY_ALL_FILTER,
    APPLY_COMPLETED_FILTER,
    ASYNC_END,
    ASYNC_START,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    REMOVE_TODO,
    SET_PAGE,
    UPDATE_TODO,
} from "../actionTypes";

var defaultState = {
    todos: [],
    pager: null,
    todosCount: 0,
    currentPage: 1,
    errors: null,
    inProgress: false,
};

function todos(state = defaultState, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: action.error ? state.todos : [action.payload, ...state.todos],
                errors: action.error ? action.payload.errors : null,
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: action.error
                    ? state.todos
                    : state.todos.map((todo) =>
                          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                      ),
                errors: action.error ? action.payload.errors : null,
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: action.error
                    ? state.todos
                    : state.todos.filter((todo) => {
                          return todo.id !== action.payload.id;
                      }),
                errors: action.error ? action.payload.errors : null,
            };
        case SET_PAGE:
            return {
                ...state,
                todos: action.error ? state.todos : action.payload.value,
                todosCount: action.error ? state.todosCount : action.payload.count,
                currentPage: action.error ? state.currentPage : action.page,
                errors: action.error ? action.payload.errors : null,
            };

        case APPLY_ALL_FILTER:
        case APPLY_ACTIVE_FILTER:
        case APPLY_COMPLETED_FILTER:
        case HOME_PAGE_LOADED:
            return {
                ...state,
                pager: action.error ? state.pager : action.pager,
                todos: action.error ? state.todos : action.payload.value,
                todosCount: action.error ? state.todosCount : action.payload.count,
                currentPage: state.currentPage,
                errors: action.error ? action.payload.errors : null,
            };
        case HOME_PAGE_UNLOADED:
            return defaultState;
        case ASYNC_START:
            if (
                [
                    ADD_TODO,
                    APPLY_ACTIVE_FILTER,
                    APPLY_ALL_FILTER,
                    APPLY_COMPLETED_FILTER,
                    HOME_PAGE_LOADED,
                    REMOVE_TODO,
                    SET_PAGE,
                    UPDATE_TODO,
                ].includes(action.subtype)
            ) {
                return { ...state, inProgress: true };
            }
            return state;
        case ASYNC_END:
            if (
                [
                    ADD_TODO,
                    APPLY_ACTIVE_FILTER,
                    APPLY_ALL_FILTER,
                    APPLY_COMPLETED_FILTER,
                    HOME_PAGE_LOADED,
                    REMOVE_TODO,
                    SET_PAGE,
                    UPDATE_TODO,
                ].includes(action.subtype)
            ) {
                return { ...state, inProgress: false };
            }
            return state;
        default:
            return state;
    }
}

export default todos;
