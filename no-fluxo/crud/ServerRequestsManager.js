import elementManager from "../dom/ElementManager.js"
class ServerRequestsManager {
    async makePostRequest(url, payload, responseMethodName = 'json') {
        if (typeof url !== "string") {
            throw new Error("Post request's url must be of string type");
        }
        if (typeof payload !== "object" || payload === null) {
            throw new Error("Payload must be an object");
        }
        if (typeof responseMethodName !== "string") {
            throw new Error("Response method name must be a string");
        }
        const requestOptions = {
            method: "POST",
            ...payload
        };

        const response = await fetch(url, requestOptions);
        if (!response[responseMethodName]) {
            throw new Error(`Response method '${responseMethodName}' does not exist on response object`);
        }
        const processedResponse = await response[responseMethodName]();
        return processedResponse;
    }
    async makeGetRequest(url, headers, responseMethodName = 'json') {
        if (typeof url !== "string") {
            throw new Error("GET request's url must be of string type");
        }
        if (!headers || typeof headers !== "object" || Object.keys(headers).length === 0) {
            throw new Error("Headers must be a non-empty object");
        }
        if (typeof responseMethodName !== "string") {
            throw new Error("Response method name must be a string");
        }
        const requestOptions = {
            method: "GET",
            headers: headers,
        };
        const response = await fetch(url, requestOptions);
        if (!response[responseMethodName]) {
            throw new Error(`Response method '${responseMethodName}' does not exist on response object`);
        }
        const processedResponse = await response[responseMethodName]();
        return processedResponse;
    }
    async makePutRequest(url, payload = {}, headers, responseMethodName = 'json') {
        if (typeof url !== "string") {
            throw new Error("PUT request's url must be of string type");
        }
        if (typeof payload !== "object" || payload === null) {
            throw new Error("Payload must be an object");
        }
        if (!headers || typeof headers !== "object" || Object.keys(headers).length === 0) {
            throw new Error("Headers must be a non-empty object");
        }
        if (typeof responseMethodName !== "string") {
            throw new Error("Response method name must be a string");
        }
        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(payload),
        };
        const response = await fetch(url, requestOptions);
        if (!response[responseMethodName]) {
            throw new Error(`Response method '${responseMethodName}' does not exist on response object`);
        }
        const processedResponse = await response[responseMethodName]();
        return processedResponse;
    }
    async activateLoginForm() {
        const loginButton = document.querySelector("a");
        elementManager.addEvent(loginButton, "click",)
    }
    async getLoginData() {

    }
    async login() {

    }
}


export default ServerRequestsManager;