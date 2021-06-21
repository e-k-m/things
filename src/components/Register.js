import { connect } from "react-redux";
import { Link } from "@reach/router";
import React, { useEffect } from "react";

import agent from "../agent";
import { REGISTER_PAGE_UNLOADED, REGISTER, UPDATE_FIELD_AUTH } from "../actionTypes";
import ListErrors from "./ListErrors";

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        email: state.auth.email,
        password: state.auth.password,
        errors: state.auth.errors,
        inProgress: state.auth.inProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername(value) {
            dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value });
        },
        onChangeEmail(value) {
            dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value });
        },
        onChangePassword(value) {
            dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value });
        },
        onSubmit(username, email, password, navigate) {
            var payload = agent.Auth.register(username, email, password).then((payload) => {
                navigate("/");
                return payload;
            });
            dispatch({ type: REGISTER, payload });
        },
        onUnload() {
            dispatch({ type: REGISTER_PAGE_UNLOADED });
        },
    };
}

function Register({
    username,
    email,
    password,
    errors,
    inProgress,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    onUnload,
    navigate,
}) {
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
                    onSubmit(username, email, password, navigate);
                }}
            >
                <input
                    className="new-todo"
                    type="text"
                    placeholder="Username"
                    value={username || ""}
                    onChange={(ev) => onChangeUsername(ev.target.value)}
                />

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
                        Register
                    </button>
                </footer>
            </form>
            <ListErrors errors={errors}></ListErrors>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
