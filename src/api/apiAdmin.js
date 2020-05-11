const baseUrl = __API_HOST;


function handleResponse(response) {
    const {status} = response;
    if ([401, 403].includes(status)) {
        throw new Error('unable to login');
    } else if (status === 200) {
        return response;
    } else if ([400, 409].includes(status)) {
        return response;
    } else {
        throw new Error()
    }
}

export function loginToAdmin(username, password) {
    const body = {username, password}
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    return fetch(`${baseUrl}/my-admin/login`, options)
        .then(response => handleResponse(response).json())
        .then(responseJson => sessionStorage.token = responseJson.token)
}

export function fetchSessions(questId) {
    return fetch(`${baseUrl}/my-admin/quests/${questId}/sessions`,
        {headers: {'x-access-token': sessionStorage.token}})
        .then(response => handleResponse(response).json())
}

export function fetchQuests() {
    return fetch(`${baseUrl}/my-admin/quests`,
        {headers: {'x-access-token': sessionStorage.token}})
        .then(response => handleResponse(response).json())
}

export function fetchQuest(questId) {
    return fetch(`${baseUrl}/my-admin/quests/${questId}`,
        {headers: {'x-access-token': sessionStorage.token}})
        .then(response => handleResponse(response).json())
}

export function fetchCodes(questId) {
    return fetch(`${baseUrl}/my-admin/quests/${questId}/codes`,
        {headers: {'x-access-token': sessionStorage.token}})
        .then(response => handleResponse(response).json())
}

export function postQuest(questDetails) {
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'x-access-token': sessionStorage.token},
        body: JSON.stringify(questDetails)
    }
    return fetch(`${baseUrl}/my-admin/quests`, options)
        .then(response => handleResponse(response).json())
}

export function updateQuest(questId, questDetails) {
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json', 'x-access-token': sessionStorage.token},
        body: JSON.stringify(questDetails)
    }
    return fetch(`${baseUrl}/my-admin/quests/${questId}`, options)
        .then(response => handleResponse(response).json())
}

export function deleteQuest(questId) {
    const options = {
        method: "DELETE",
        headers: {'x-access-token': sessionStorage.token}
    }
    return fetch(`${baseUrl}/my-admin/quests/${questId}`, options)
        .then(response => handleResponse(response).json())
}
