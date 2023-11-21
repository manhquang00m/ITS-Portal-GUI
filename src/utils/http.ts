import axios, { AxiosInstance } from "axios";

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://management-tool-403211.as.r.appspot.com/api/',
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

const http = new Http().instance

export default http