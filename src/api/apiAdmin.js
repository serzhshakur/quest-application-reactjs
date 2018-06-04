const baseUrl = __API_HOST;


function handleResponseForAuthorizedCall(response) {
    const { status } = response;
    if ([401, 403].includes(status)) {
        throw new Error('unable to login');
    } else if (status == 200) {
        return response.json();
    } else {
        throw new Error()
    }
}

export function loginToAdmin(username, password) {
    const body = { username, password }
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(`${baseUrl}/my-admin/login`, options)
        .then(response => handleResponseForAuthorizedCall(response))
        .then(responseJson => sessionStorage.token = responseJson.token)
}

export function fetchQuests() {
    return fetch(`${baseUrl}/my-admin/quests`,
        { headers: { 'x-access-token': sessionStorage.token } })
        .then(response => handleResponseForAuthorizedCall(response))
}

export function fetchQuest(questId) {
    return fetch(`${baseUrl}/my-admin/quests/${questId}`,
        { headers: { 'x-access-token': sessionStorage.token } })
        .then(response => handleResponseForAuthorizedCall(response))
}

export function postQuest(questDetails) {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.token },
        body: JSON.stringify(questDetails)
    }
    return fetch(`${baseUrl}/my-admin/quests`, options)
        .then(response => handleResponseForAuthorizedCall(response))
}

export function updateQuest(questId, questDetails) {
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.token },
        body: JSON.stringify(questDetails)
    }
    return fetch(`${baseUrl}/my-admin/quests/${questId}`, options)
        .then(response => handleResponseForAuthorizedCall(response))
}