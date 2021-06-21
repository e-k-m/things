import { HOST_USERS, HOST_TODOS } from "./settings";

const LIMIT = 5;

var ACCESS_TOKEN = null;

function setAccessToken(token) {
    ACCESS_TOKEN = token;
}

function error(message, status) {
    var e = new Error(message);
    e.type = "application";
    e.status = status;
    return e;
}

function handleErrors(response) {
    if (!response.ok && (response.status === 400 || response.status === 409)) {
        throw error("Oops input is not valid.", response.status);
    }

    if (!response.ok && response.status === 401) {
        throw error("", response.status);
    }

    if (!response.ok) {
        throw error("Oops something went wrong.", response.status);
    }

    return response;
}

var Auth = {
    register(username, email, password) {
        var payload = { username, email, password };
        return fetch(`${HOST_USERS}/api/v0.0/users/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
    login(email, password) {
        var payload = { email, password };
        return fetch(`${HOST_USERS}/api/v0.0/users/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
    info() {
        return fetch(`${HOST_USERS}/api/v0.0/users/info`, {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
};

var Todos = {
    all(page = 1) {
        return fetch(`${HOST_TODOS}/api/v0.0/todos?page=${page}&count=True&limit=${LIMIT}&order=date desc`, {
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
    byActive(page = 1) {
        return fetch(
            `${HOST_TODOS}/api/v0.0/todos?page=${page}&count=True&limit=${LIMIT}&filter=completed eq False&order=date desc`,
            {
                method: "get",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        )
            .then(handleErrors)
            .then((response) => response.json());
    },
    byCompleted(page = 1) {
        return fetch(
            `${HOST_TODOS}/api/v0.0/todos?page=${page}&count=True&limit=${LIMIT}&filter=completed eq True&order=date desc`,
            {
                method: "get",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        )
            .then(handleErrors)
            .then((response) => response.json());
    },
    create(text) {
        var payload = { text };
        return fetch(`${HOST_TODOS}/api/v0.0/todos`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(payload),
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
    update(todo) {
        var payload = {
            text: todo.text,
            completed: todo.completed,
        };
        return fetch(`${HOST_TODOS}/api/v0.0/todos/${todo.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(payload),
        })
            .then(handleErrors)
            .then((response) => response.json());
    },
    delete(id) {
        return fetch(`${HOST_TODOS}/api/v0.0/todos/${id}`, {
            method: "delete",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        })
            .then(handleErrors)
            .then((response) => {
                return { id };
            });
    },
};

export default { Auth, Todos, setAccessToken, LIMIT };
