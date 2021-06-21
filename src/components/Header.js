import { connect } from "react-redux";
import { Link } from "@reach/router";
import React from "react";

import { LOGOUT } from "../actionTypes";

function mapStateToProps(state) {
    return {
        appLoaded: state.common.appLoaded,
        currentUser: state.common.currentUser,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout() {
            dispatch({ type: LOGOUT });
        },
    };
}

function Header({ appLoaded, currentUser, onLogout }) {
    if (appLoaded) {
        let username = "";
        if (currentUser) {
            username = currentUser.username;
        }
        return (
            <header>
                <h1 className="header">todos of {username}</h1>
                <button className="logout" onClick={onLogout}>
                    <h3>logout</h3>
                </button>
            </header>
        );
    }

    return (
        <header>
            <h1 className="header">todos</h1>
            <Link to="register">
                <h3 className="nav">register</h3>
            </Link>
            <Link to="login">
                <h3 className="nav">login</h3>
            </Link>
        </header>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
