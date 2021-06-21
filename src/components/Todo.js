import { connect } from "react-redux";
import React from "react";

import agent from "../agent";
import { SET_CURRENT_EDITING_TEXT, SET_CURRENT_EDITING, SET_PAGE, UPDATE_TODO } from "../actionTypes";
import { partial } from "../utils";

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

function onToggle(dispatch, todo) {
    var t = { ...todo, completed: !todo.completed };
    var payload = agent.Todos.update(t);
    dispatch({
        type: UPDATE_TODO,
        payload,
    });
}

function onDestroy(dispatch, todo, todosCount, currenPage, pager) {
    var pagesCount = Math.ceil((todosCount - 1) / agent.LIMIT) ? Math.ceil((todosCount - 1) / agent.LIMIT) : 1;
    var page = currenPage;
    if (page > pagesCount) {
        page = pagesCount;
    }

    var payload = agent.Todos.delete(todo.id).then(() => {
        return pager(page);
    });

    dispatch({
        type: SET_PAGE,
        page,
        payload,
    });
}

function onEdit(dispatch, todo, text) {
    dispatch({
        type: SET_CURRENT_EDITING,
        editing: todo.id,
    });
    dispatch({
        type: SET_CURRENT_EDITING_TEXT,
        editingText: text,
    });
}

function onBlur(dispatch, ev, todo, todosCount, currentPage, pager) {
    var text = ev.target.value.trim();

    if (text === "") {
        var pagesCount = Math.ceil((todosCount - 1) / agent.LIMIT) ? Math.ceil((todosCount - 1) / agent.LIMIT) : 1;
        let page = currentPage;
        if (page > pagesCount) {
            page = pagesCount;
        }
        var payload = agent.Todos.delete(todo.id).then(() => {
            return pager(page);
        });
        dispatch({
            type: SET_PAGE,
            page,
            payload,
        });
    } else {
        // eslint-disable-next-line no-redeclare
        var payload = agent.Todos.update({ id: todo.id, text });
        dispatch({
            type: UPDATE_TODO,
            payload,
        });
    }

    dispatch({
        type: SET_CURRENT_EDITING,
        editing: null,
    });
    dispatch({
        type: SET_CURRENT_EDITING_TEXT,
        editingText: "",
    });
}

function onChange(dispatch, ev) {
    dispatch({
        type: SET_CURRENT_EDITING_TEXT,
        editingText: ev.target.value,
    });
}

function onKeyDown(dispatch, ev, todo, todosCount, currentPage, pager) {
    if (ev.which === ESCAPE_KEY) {
        dispatch({
            type: SET_CURRENT_EDITING,
            editing: null,
        });
        dispatch({
            type: SET_CURRENT_EDITING_TEXT,
            editingText: "",
        });
    } else if (ev.which === ENTER_KEY) {
        onBlur(dispatch, ev, todo, todosCount, currentPage, pager);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        todo: ownProps.todo,
        currentText: state.current.editingText,
        currentEditing: state.current.editing,
        todosCount: state.todos.todosCount,
        currentPage: state.todos.currentPage,
        pager: state.todos.pager,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: partial(onToggle, dispatch),
        onDestroy: partial(onDestroy, dispatch),
        onEdit: partial(onEdit, dispatch),
        onBlur: partial(onBlur, dispatch),
        onChange: partial(onChange, dispatch),
        onKeyDown: partial(onKeyDown, dispatch),
    };
}

function Todo({
    todo,
    currentText,
    currentEditing,
    todosCount,
    currentPage,
    pager,
    onToggle,
    onDestroy,
    onEdit,
    onBlur,
    onChange,
    onKeyDown,
}) {
    var className = "";
    if (todo.completed) {
        className = "completed";
    }
    var isCurrentEditing = currentEditing === todo.id;
    if (isCurrentEditing) {
        className = "editing";
    }

    return (
        <li className={className}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed ? " " : ""}
                    onChange={() => onToggle(todo)}
                />

                <label onDoubleClick={() => onEdit(todo, todo.text)}>{todo.text}</label>
                <button className="destroy" onClick={() => onDestroy(todo, todosCount, currentPage, pager)} />
            </div>
            <input
                className="edit"
                value={currentText}
                onBlur={(ev) => {
                    if (isCurrentEditing) {
                        onBlur(ev, todo, todosCount, currentPage, pager);
                    }
                }}
                onChange={(ev) => {
                    if (isCurrentEditing) {
                        onChange(ev);
                    }
                }}
                onKeyDown={(ev) => onKeyDown(ev, todo, todosCount, currentPage, pager)}
            />
        </li>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
