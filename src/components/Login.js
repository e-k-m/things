import { connect } from "react-redux";
import { Link } from "@reach/router";
import React, { useEffect } from "react";

import { UPDATE_FIELD_AUTH, LOGIN, LOGIN_PAGE_UNLOADED } from "../actionTypes";
import agent from "../agent";
import ListErrors from "./ListErrors";

function mapStateToProps(state) {
    return {
        email: state.auth.email,
        password: state.auth.password,
        errors: state.auth.errors,
        inProgress: state.auth.inProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeEmail(value) {
            dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value });
        },
        onChangePassword(value) {
            dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value });
        },
        onSubmit(email, password, navigate) {
            var payload = agent.Auth.login(email, password).then((payload) => {
                navigate("/");
                return payload;
            });
            dispatch({ type: LOGIN, payload });
        },
        onUnload() {
            dispatch({ type: LOGIN_PAGE_UNLOADED });
        },
    };
}

function Login({ email, password, errors, inProgress, onChangeEmail, onChangePassword, onSubmit, onUnload, navigate }) {
    useEffect(() => {
        return function cleanup() {
            onUnload();
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <header>
                <h1 className="header">register</h1>
                <Link to="/">
                    <h3 className="nav">todos</h3>
                </Link>
            </header>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    onSubmit(email, password, navigate);
                }}
            >
                <input
                    className="new-todo"
                    type="email"
                    placeholder="Email"
                    value={email || ""}
                    onChange={(ev) => onChangeEmail(ev.target.value)}
                />

                <input
                    className="new-todo"
                    type="password"
                    placeholder="Password"
                    value={password || ""}
                    onChange={(ev) => onChangePassword(ev.target.value)}
                />
                <footer className="footer">
                    <button className="form-button" type="submit" disabled={inProgress}>
                        Login
                    </button>
                </footer>
            </form>
            <ListErrors errors={errors}></ListErrors>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
