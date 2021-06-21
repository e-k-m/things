import { connect } from "react-redux";
import React from "react";

import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from "../actionTypes";
import { useComponentWillMount } from "../hooks";
import AddTodo from "./AddTodo";
import agent from "../agent";
import Footer from "./Footer";
import Header from "./Header";
import ListErrors from "./ListErrors";
import TodoList from "./TodoList";

function mapStateToProps(state) {
    return {
        appLoaded: state.common.appLoaded,
        errors: { ...state.todos.errors, ...state.common.errors },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoad(pager, payload) {
            dispatch({ type: HOME_PAGE_LOADED, pager, payload });
        },
        onUnload() {
            dispatch({ type: HOME_PAGE_UNLOADED });
        },
    };
}

function Home({ appLoaded, errors, onLoad, onUnload }) {
    useComponentWillMount(() => {
        var pager = agent.Todos.all;
        onLoad(pager, pager());

        return function cleanup() {
            onUnload();
        };
    });

    if (appLoaded) {
        return (
            <div>
                <Header />
                <AddTodo />
                <TodoList />
                <Footer />
                <ListErrors errors={errors}></ListErrors>
            </div>
        );
    }
    return <Header />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
