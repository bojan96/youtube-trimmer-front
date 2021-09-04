import { Client } from "@stomp/stompjs";
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

function unsubscribe()
{
    this.subscription.unsubscribe();
    this.client.deactivate();
}

export function subscribeJobEvents(callback) {

    const subscriptionData = {};
    const token = localStorage.getItem(config.TOKEN_ITEM);
    const client = new Client({
        brokerURL: config.STOMP_URL,
        connectHeaders: {
            authorization: token
        }
    });

    client.onConnect = () => {
        const subscription = client.subscribe(config.JOB_EVENTS_PATH, (msg) => {
            callback(JSON.parse(msg.body));
        });
        subscriptionData.subscription = subscription;
    };

    client.activate();
    subscriptionData.client = client;
    subscriptionData.unsubscribe = unsubscribe.bind(subscriptionData);

    return subscriptionData;
}


