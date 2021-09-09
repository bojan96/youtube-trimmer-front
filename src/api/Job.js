import { Client } from "@stomp/stompjs";
import { bearerAuthHeaders } from "../util/AuthUtils";
import { makeEndpoint } from "../util/UrlUtils";
import constants from './constants.json';

export async function createJob(job) {

    const endpoint = makeEndpoint(process.env.REACT_APP_API_URL, "/api/job");
    const token = localStorage.getItem(constants.TOKEN_ITEM)

    await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(job),
        headers: bearerAuthHeaders(token, { "content-type": "application/json" })
    });
}

export async function getJobs() {
    const endpoint = makeEndpoint(process.env.REACT_APP_API_URL, "/api/job")
    const token = localStorage.getItem(constants.TOKEN_ITEM);

    const response = await fetch(endpoint, {
        method: "GET",
        headers: bearerAuthHeaders(token)
    });

    return await response.json();
}

export async function cancelJob(jobId) {
    const endpoint = makeEndpoint(process.env.REACT_APP_API_URL, `/api/job/${jobId}/cancel`)
    const token = localStorage.getItem(constants.TOKEN_ITEM);

    await fetch(endpoint, {
        method: "POST",
        headers: bearerAuthHeaders(token)
    });
}

function unsubscribe()
{
    this.subscription.unsubscribe();
    this.client.deactivate();
}

export function subscribeJobEvents(callback) {

    const subscriptionData = {};
    const token = localStorage.getItem(constants.TOKEN_ITEM);
    const client = new Client({
        brokerURL: process.env.REACT_APP_STOMP_URL,
        connectHeaders: {
            authorization: token
        }
    });

    client.onConnect = () => {
        const subscription = client.subscribe(constants.JOB_EVENTS_PATH, (msg) => {
            callback(JSON.parse(msg.body));
        });
        subscriptionData.subscription = subscription;
    };

    client.activate();
    subscriptionData.client = client;
    subscriptionData.unsubscribe = unsubscribe.bind(subscriptionData);

    return subscriptionData;
}

export async function getJob(id)
{
    const endpoint = makeEndpoint(process.env.REACT_APP_API_URL, `/api/job/${id}`)
    const token = localStorage.getItem(constants.TOKEN_ITEM);

    const response = await fetch(endpoint, {
        method: "GET",
        headers: bearerAuthHeaders(token)
    });

    return await response.json();
}


