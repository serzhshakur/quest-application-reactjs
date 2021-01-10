const baseUrl = __API_HOST;

export type SessionUpdateRequest = {
    name?: string,
    phone?: string,

}

export type SessionResponse = {
    questId: string
    finished?: Date
}

export type NewSessionResponse = {
    isNew: boolean
}

export type IntroResponse = {
    intro: string,
    isTeamNameRequired?: boolean,
    isPhoneRequired?: boolean,
}

export function isNewSession(session: SessionResponse | NewSessionResponse): session is NewSessionResponse {
    return (session as NewSessionResponse).isNew !== undefined;
}

export function isPendingSession(session: SessionResponse | NewSessionResponse): session is SessionResponse {
    return (session as SessionResponse).questId !== undefined;
}

export async function fetchSession(): Promise<Response> {
    return await fetch(`${baseUrl}/session`, {credentials: 'include'});
}

export async function fetchSessionForQuestId(questId: string): Promise<Response> {
    return await fetch(`${baseUrl}/session/${questId}`, {credentials: 'include'});
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
