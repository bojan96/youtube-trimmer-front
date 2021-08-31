import { bearerAuthHeaders } from "../util/AuthUtils";
import { makeEndpoint } from "../util/UrlUtils";

const API_URL = "http://localhost:8080"

function createRequestUrl(endpoint) {
    return makeEndpoint(API_URL, endpoint);
}

export async function isUserLoggedIn() {
    const token = localStorage.getItem("token");

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
        body: JSON.stringify({username, password}),
        headers: new Headers({'content-type': 'application/json'})
    });

    return response.ok;
}