import { bearerAuthHeaders } from "../util/AuthUtils";
import { makeEndpoint } from "../util/UrlUtils";
import config from './config.json';

function createRequestUrl(endpoint) {
    return makeEndpoint(config.API_URL, endpoint);
}

export async function isUserLoggedIn() {
    const token = localStorage.getItem(config.TOKEN_ITEM);

    if (token == null) {
        return false;
    }

    const url = createRequestUrl("/api/auth/token/refresh");
    const response = await fetch(url, {
        method: "POST",
        body: token,
        headers: bearerAuthHeaders(token)
    });

    return response.ok;
}


export async function login(username, password) {

    const url = createRequestUrl("/api/auth/login");

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'content-type': 'application/json' })
    });

    if (response.ok) {
        localStorage.setItem(config.TOKEN_ITEM, await response.text());
    }

    return response.ok;
}

export function logout() {
    localStorage.removeItem(config.TOKEN_ITEM);
}
