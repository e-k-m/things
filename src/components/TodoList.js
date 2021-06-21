import { connect } from "react-redux";
import React from "react";

import Todo from "./Todo";

function mapStateToProps(state) {
    return {
        todos: state.todos.todos,
    };
}

function TodoList({ todos }) {
    return (
        <section className="main">
            <label htmlFor="toggle-all" />
            <ul className="todo-list">
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </ul>
        </section>
    );
}

export default connect(mapStateToProps, null)(TodoList);
