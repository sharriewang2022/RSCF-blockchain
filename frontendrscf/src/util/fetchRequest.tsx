import RequestHeaders from "./requestHeaders";
const ApiUrl = 'http://localhost:3002';
const FetchRequest = () => {
    const request = async (url: string, method: string = 'GET', body?: any) => {
        const requestParams: any = {
            headers: RequestHeaders,
            method: method,
        };
        if (!['GET'].includes(method)) {
            requestParams.body = JSON.stringify(body);
        }
        let response = await fetch(`${ApiUrl}/${url}`, requestParams);
        return await response.json();
    }
    return request;

}
export default FetchRequest;