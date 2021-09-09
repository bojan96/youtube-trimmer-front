import { bearerAuthHeaders } from "../util/AuthUtils";
import { makeEndpoint } from "../util/UrlUtils";
import constants from './constants.json';

function createRequestUrl(endpoint) {
    return makeEndpoint(process.env.REACT_APP_API_URL, endpoint);
}

export async function isUserLoggedIn() {
    const token = localStorage.getItem(constants.TOKEN_ITEM);

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
        localStorage.setItem(constants.TOKEN_ITEM, await response.text());
    }

    return response.ok;
}

export function logout() {
    localStorage.removeItem(constants.TOKEN_ITEM);
}
