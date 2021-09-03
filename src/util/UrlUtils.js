export function makeEndpoint(base, endpoint, params = {}) {

    const paramsArray = Object.keys(params);
    const concatParams = paramsArray
        .map(param => `${param}=${params[param]}`)
        .join("&");
    if (endpoint.charAt(endpoint.length - 1) === "/") {
        endpoint = endpoint.substring(0, endpoint.length - 1);
    }

    const queryString = paramsArray.length > 0 ? `?${concatParams}`: "";

    return new URL(`${endpoint}${queryString}`, base).toString();
}