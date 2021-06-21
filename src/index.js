import { Provider } from "react-redux";
import { render } from "react-dom";
import React from "react";

import { store } from "./store";
import App from "./components/App";

// TODO: Add unit tests.
// TODO: Cleanup CSS. Response design needs some small tweaks. Paging repsonsive.
// TODO: https://create-react-app.dev/docs/fetching-data-with-ajax-requests.
// TODO: Have settings build on env compile.

// TODO: Add client side logging to server via common library.
// TODO: Add feature to edit user, delete user and all his todos.
// TODO: Start using refresh token.

// REVIEW: Pass event or value to dispatcher.
// REVIEW: Props dryling vs not using redux. study real world.

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
