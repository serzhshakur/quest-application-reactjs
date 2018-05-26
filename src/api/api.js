const baseUrl = __API_HOST;


export function validateId(id) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'text/plain' },
        body: id,
        credentials: 'include',
        // headers: {
        //     'Access-Control-Allow-Origin': baseUrl
        // }
        // credentials: 'same-origin'
    };
    return fetch(`${baseUrl}/sign-in/`, options)
}

export function fetchHint() {
    return fetch(`${baseUrl}/questions/hint`, { credentials: 'include' })
        .then(response => response.json())
}

export function fetchIntro() {
    return fetch(`${baseUrl}/questions/intro`, { credentials: 'include' })
        .then(response => response.text())
}

export function fetchFinalWords() {
    return fetch(`${baseUrl}/questions/final`, { credentials: 'include' })
        .then(response => response.json())
}

export function postAnswer(answer) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'text/plain' },
        body: answer,
        credentials: 'include'
    };
    return fetch(`${baseUrl}/questions`, options)
        .then(response => response.json())
}

export function fetchQuestion() {
    return fetch(`${baseUrl}/questions`, { credentials: 'include' })
        .then(response => response.json())
}