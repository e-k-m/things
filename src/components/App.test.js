import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { store } from "../store";
import App from "./App";

it("renders without crashing", () => {
    var div = document.createElement("div");
    var app = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    ReactDOM.render(app, div);
});
