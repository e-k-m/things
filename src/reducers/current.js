import { SET_CURRENT_EDITING_TEXT, SET_CURRENT_EDITING, SET_CURRENT_TEXT } from "../actionTypes";

var defaultState = { text: "", editingText: "", editing: "" };

function current(state = defaultState, action) {
    switch (action.type) {
        case SET_CURRENT_TEXT:
            return { ...state, text: action.text };
        case SET_CURRENT_EDITING_TEXT:
            return { ...state, editingText: action.editingText };
        case SET_CURRENT_EDITING:
            return { ...state, editing: action.editing };
        default:
            return state;
    }
}

export default current;
