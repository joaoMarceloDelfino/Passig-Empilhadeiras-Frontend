import axios from "axios";

class BaseApi{

    constructor(){
        this.baseApiUrl = "http://localhost:8080/api";
    }

    findAllEmpilhadeiras(){
        const api = `${this.baseApiUrl}/forklifts/findAll`;
        return axios.get(api);
    }

    login(){
        const api = `${this.baseApiUrl}/user/login`;
        return axios.post(api)
    }

    register(body){
        const api = `${this.baseApiUrl}/user/register`;
        return axios.post(api, body)
    }

}

export default new BaseApi();