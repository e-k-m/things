import { connect } from "react-redux";
import { Router } from "@reach/router";
import React from "react";

import { APP_LOAD } from "../actionTypes";
import { useComponentWillMount } from "../hooks";
import agent from "../agent";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

import "../index.css";

function mapDispatchToProps(dispatch) {
    return {
        onLoad(payload, token) {
            dispatch({ type: APP_LOAD, payload, token });
        },
    };
}

function App({ onLoad }) {
    useComponentWillMount(() => {
        var accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
            agent.setAccessToken(accessToken);
        }

        onLoad(accessToken ? agent.Auth.info() : null, accessToken);
    });

    return (
        <Router>
            <Home path="/" />
            <Register path="register" />
            <Login path="login" />
        </Router>
    );
}

export default connect(null, mapDispatchToProps)(App);
