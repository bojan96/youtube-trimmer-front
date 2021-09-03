import { bearerAuthHeaders } from "../util/AuthUtils";
import { makeEndpoint } from "../util/UrlUtils";
import config from './config.json';

export async function createJob(job) {

    const endpoint = makeEndpoint(config.API_URL, "/api/job");
    const token = localStorage.getItem(config.TOKEN_ITEM)

    const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(job),
        headers: bearerAuthHeaders(token, { "content-type": "application/json" })
    });

    if (!response.ok) {
        throw new Error(`Unable to create a job, status code: ${response.status}`);
    }
}

export async function getJobs() {
    const endpoint = makeEndpoint(config.API_URL, "/api/job")
    const token = localStorage.getItem(config.TOKEN_ITEM);

    const response = await fetch(endpoint, {
        method: "GET",
        headers: bearerAuthHeaders(token, { "content-type": "application/json" })
    });

    if (!response.ok) {
        throw new Error(`Unable to retrieve user jobs, status code: ${response.status}`);
    }

    return await response.json();
}

export async function cancelJob(jobId) {
    const endpoint = makeEndpoint(config.API_URL, `/api/job/${jobId}/cancel`)
    const token = localStorage.getItem(config.TOKEN_ITEM);

    const response = await fetch(endpoint, {
        method: "POST",
        headers: bearerAuthHeaders(token, { "content-type": "application/json" })
    });

    if (!response.ok) {
        throw new Error(`Unable to cancel job, status code: ${response.status}`);
    }
}


