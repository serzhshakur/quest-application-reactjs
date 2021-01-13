export const baseUrl = __API_HOST;

export type SessionUpdateRequest = {
    name?: string,
    phone?: string,

}

export type SessionResponse = {
    questId: string
    finished?: Date
    isNewSession?: boolean,
    name?: string
}


export type IntroResponse = {
    intro: string,
    isTeamNameRequired?: boolean,
    isPhoneRequired?: boolean,
}

export async function fetchSession(questId?: string): Promise<Response> {
    let options: RequestInit = {credentials: 'include'};
    if (questId) return await fetch(`${baseUrl}/session/${questId}`, options);
    else return await fetch(`${baseUrl}/session`, options);
}

export async function fetchIntro(): Promise<IntroResponse> {
    return await fetch(`${baseUrl}/questions/intro`, {credentials: 'include'})
        .then(response => response.json())
}

export function updateSession(request: SessionUpdateRequest) {
    const options: RequestInit = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request),
        credentials: 'include'
    };
    return fetch(`${baseUrl}/session`, options)
}

export function startOverSession() {
    const options: RequestInit = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    };
    return fetch(`${baseUrl}/session/startover`, options)
}
