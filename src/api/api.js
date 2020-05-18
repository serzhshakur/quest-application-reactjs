const baseUrl = __API_HOST;


export function validateId(id) {
    const options = {
        method: "POST",
        headers: {'Content-Type': 'text/plain'},
        body: id,
        credentials: 'include',
    };
    return fetch(`${baseUrl}/sign-in/`, options)
}

export function fetchHint() {
    return fetch(`${baseUrl}/questions/hint`, {credentials: 'include'})
        .then(response => response.json())
}

export function fetchIntro() {
    return fetch(`${baseUrl}/questions/intro`, {credentials: 'include'})
        .then(response => response.json())
}

export function fetchSession() {
    return fetch(`${baseUrl}/session`, {credentials: 'include'})
}

export function updateSession(parameters) {
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(parameters),
        credentials: 'include'
    };
    return fetch(`${baseUrl}/session`, options)
}

export function deleteSession() {
    const options = {
        method: "DELETE",
        credentials: 'include'
    };
    return fetch(`${baseUrl}/session`, options)
}

export function fetchFinalWords() {
    return fetch(`${baseUrl}/questions/final`, {credentials: 'include'})
        .then(response => response.json())
}

export function postAnswer(answer) {
    const options = {
        method: "POST",
        headers: {'Content-Type': 'text/plain'},
        body: answer,
        credentials: 'include'
    };
    return fetch(`${baseUrl}/questions`, options)
        .then(response => response.json())
}

export function fetchQuestion() {
    return fetch(`${baseUrl}/questions`, {credentials: 'include'})
        .then(response => response.json())
}