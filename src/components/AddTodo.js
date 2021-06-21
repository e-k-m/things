import { connect } from "react-redux";
import React from "react";

import { partial } from "../utils";
import { SET_PAGE, SET_CURRENT_TEXT } from "../actionTypes";
import agent from "../agent";

const ENTER_KEY = 13;

function onKeyDown(dispatch, ev, page, pager) {
    if (ev.keyCode !== ENTER_KEY) {
        return;
    }
    ev.preventDefault();
    var text = ev.target.value.trim();
    if (text) {
        var payload = agent.Todos.create(text).then(() => pager(page));
        dispatch({
            type: SET_PAGE,
            page,
            payload,
        });
        dispatch({
            type: SET_CURRENT_TEXT,
            text: "",
        });
    }
}

function onChange(dispatch, ev) {
    dispatch({
        type: SET_CURRENT_TEXT,
        text: ev.target.value,
    });
}

function mapStateToProps(state) {
    return {
        page: state.todos.currentPage,
        pager: state.todos.pager,
        text: state.current.text,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onKeyDown: partial(onKeyDown, dispatch),
        onChange: partial(onChange, dispatch),
    };
}

function AddTodo({ page, pager, text, onChange, onKeyDown }) {
    return (
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={onChange}
            onKeyDown={(ev) => onKeyDown(ev, page, pager)}
            autoFocus={true}
        />
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
