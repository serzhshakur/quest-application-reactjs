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
        .then(response => response.text())
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

export function loginToAdmin(username, password) {
    const body = { username, password }
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    };
    return fetch(`${baseUrl}/admin/login`, options)
        .then(response => {
            const { status } = response;
            if (status >= 400) {
                throw new Error('unable to login');
            } else if (status == 200) {
                return response.json();
            } else {
                throw new Error()
            }
        })
        .then(responseJson => sessionStorage.token = responseJson.token)
}

export function fetchQuests() {
    return fetch(`${baseUrl}/admin/quests`,
        {
            credentials: 'include',
            headers: { 'x-access-token': sessionStorage.token }
        })
        .then(response => {
            if (response.status != 200) {
                throw new Error('not authorized')
            }
            return response.json()
        })
}

export function fetchQuest(questId) {
    return fetch(`${baseUrl}/admin/quests/${questId}`,
        {
            credentials: 'include',
            headers: { 'x-access-token': sessionStorage.token }
        })
        .then(response => {
            if (response.status != 200) {
                throw new Error('not authorized')
            }
            return response.json()
        })
}

export function postQuest(questDetails) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.token },
        body: JSON.stringify(questDetails),
        credentials: 'include'
    }
    return fetch(`${baseUrl}/admin/quests`, options)
        .then(response => {
            if (response.status != 200) {
                throw new Error('not authorized')
            }
        })
}

export function updateQuest(questId, questDetails) {
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.token },
        body: JSON.stringify(questDetails),
        credentials: 'include'
    }
    return fetch(`${baseUrl}/admin/quests/${questId}`, options)
        .then(response => {
            if (response.status != 200) {
                throw new Error('not authorized')
            }
            return response.json();
        })
}