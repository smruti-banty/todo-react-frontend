const BASE_URL = "http://localhost:1200/todos";

export function getTodos() {
    return fetch(BASE_URL);
}

export function addToodo(payload) {
    return fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'content-type': "application/json"
        }
    });
}

export function upadateTodoState(id, state) {
    const url = `${BASE_URL}/${id}/state/${state}`;
    return fetch(url, { method: "PATCH" });
}

export function removeTodos() {
    return fetch(BASE_URL + "/all", { method: "DELETE" })
}