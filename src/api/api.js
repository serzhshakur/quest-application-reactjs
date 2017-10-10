const baseUrl = 'http://localhost:8000';


export function validateId(id) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'text/html' },
        body: id,
        credentials: 'include',
        timeout: 1000
        // credentials: 'same-origin'
    };
    return fetch(`${baseUrl}/validate/`, options)
    .then(response => console.log(document.cookie))
}

export function fetchHint() {
    return fetch(`${baseUrl}/quest/hint`)
        .then(response => response.json())
}

export function postAnswer(answer) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'text/html' },
        body: answer
    };
    return fetch(`${baseUrl}/quest`, options)
        .then(response => response.json())
}

export function fetchPenaltiesState() {
    return fetch(`${baseUrl}/quest/currentState`)
        .then(response => response.json())
}

export function fetchQuestion() {
    return fetch(`${baseUrl}/quest`)
        .then(response => response.json())
        .then(({ question: q }) => ({
            question: q.text,
            images: q.images && q.images.map(image => `${baseUrl}/${image}`)
        }))
}