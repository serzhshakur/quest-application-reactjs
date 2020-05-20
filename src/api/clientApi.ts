const baseUrl = __API_HOST;

export type SessionResponse = {
    questId: string
    finished?: Date
}

export async function fetchSession() {
    return await fetch(`${baseUrl}/session`, {credentials: "include"});
}
