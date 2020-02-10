import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root"
import configureStore from './store/store';

// import * as apiUtil from "./util/session_api_util.js"
// used for testing

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore()
    }

    // TESTING START
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // window.logout
    // TESTING END

    ReactDOM.render(<Root store={store} />, root)
})