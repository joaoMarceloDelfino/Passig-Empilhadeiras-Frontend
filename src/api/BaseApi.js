import axios from "axios";

function BaseApi(){

    const baseApiUrl = "http://localhost:8080/api";

    function findAllEmpilhadeiras(){
        const api = `${baseApiUrl}/forklifts/findAll`;
        return axios.get(api);
    }

    return {findAllEmpilhadeiras}
}

export default new BaseApi();