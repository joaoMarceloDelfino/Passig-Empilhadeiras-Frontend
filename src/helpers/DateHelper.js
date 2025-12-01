class DateHelper {

    dateToBrFormat(dataAmericanaStr){
        const americanDate = new Date(dataAmericanaStr);
        const brDate = americanDate.toLocaleDateString('pt-BR');

        if(brDate == "Invalid Date"){
            return dataAmericanaStr;
        }

        return brDate;
    }

    datetimeToBrFormat(dateTimeAmericanaStr){
        const date = new Date(dateTimeAmericanaStr);

        const formatted = date.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });

        return formatted;
    }

}

export default new DateHelper();