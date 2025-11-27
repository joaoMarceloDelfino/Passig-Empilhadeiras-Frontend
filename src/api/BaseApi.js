import axios from "axios";

class BaseApi{

    constructor(){
        this.baseApiUrl = "http://localhost:8080/api";
    }

    findAllEmpilhadeiras(){
        const api = `${this.baseApiUrl}/forklifts/findAll`;
        return axios.get(api);
    }

    login(body){
        const api = `${this.baseApiUrl}/user/login`;
        return axios.post(api, body, {withCredentials: true})
    }

    register(body){
        const api = `${this.baseApiUrl}/user/register`;
        return axios.post(api, body)
    }

    saveScheduledVisit(formData){
        const api = `${this.baseApiUrl}/scheduledVisit/save`;
        return axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
    }

    findDisponibleScheduledTimestamps(date){
        const api = `${this.baseApiUrl}/scheduledVisit/findDisponibleScheduledTimestamps`;
        return axios.get(api, {
            params: {
                date
            },
            withCredentials: true
        })
    }

    isUserLogged(){
        const api = `${this.baseApiUrl}/user/isUserLogged`;
        return axios.get(api, {withCredentials: true})
    }

}

export default new BaseApi();