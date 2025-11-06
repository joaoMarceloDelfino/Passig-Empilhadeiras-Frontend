class DateHelper {

    dateToBrFormat(dataAmericanaStr){
        const americanDate = new Date(dataAmericanaStr);
        const brDate = americanDate.toLocaleDateString('pt-BR');

        if(brDate == "Invalid Date"){
            return dataAmericanaStr;
        }

        return brDate;
    }

}

export default new DateHelper();