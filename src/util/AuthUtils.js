export function bearerAuthHeaders(token, headers = {})
{
    const bearerToken = `Bearer ${token}`;

    return new Headers({authorization: bearerToken, ...headers});
}