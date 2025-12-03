import styles from "./VisitsAdminPage.module.css";
import PageBase from "../PageBase/PageBase";
import { useEffect, useState } from "react";
import BaseApi from "../../api/BaseApi";
import DateHelper from "../../helpers/DateHelper";
import { findStatusByCode } from "../../enums/VisitEnum";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NotFound from "../../components/NotFound/NotFound";
import Table from "../../components/Table/Table";

const VisitsAdminPage = () => {

    const[visits, setVisits] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadVisits();
    }, [])

    const loadVisits = () => {
        setIsLoading(true)
        BaseApi.findAllScheduledVisit().then(res => {
            setVisits(res.data.map((item) => {
                
                return {
                    ...item,
                    initialScheduledTime: DateHelper.datetimeToBrFormat(item.initialScheduledTime),
                    endScheduledTime: DateHelper.datetimeToBrFormat(item.endScheduledTime),
                    userName: item.user.username,
                    userPhone: item.user.cellphoneNumber,
                    userEmail: item.user.email,
                    forklift: item?.forklift ? `${item.forklift.name} - ${item.forklift.manufacturer} ${item.forklift.model} - ${item.forklift.fabricationYear}`: null,
                    type: findStatusByCode(item.type).description
                }

            }))
        })
        .finally(() => setIsLoading(false));
    }

    if(isLoading) return <LoadingSpinner/>
    
    return(
        <PageBase title="Agendamento De Visitas">
            {
                visits.length === 0 ?
                    <NotFound 
                        title="Nenhum resultado encontrado!" 
                        text="Não foi encontrada nenhuma visita cadastrada no momento."
                    /> 
                    : (
                        <div className={styles.tableWrapper}>
                            <Table 
                                data={visits}
                                columns={["type", "initialScheduledTime", "endScheduledTime", "description", "userName", "userPhone", "userEmail", "forklift"]} 
                                headers={["Tipo", "Data Inicial", "Data Final", "Descrição", "Nome do Usuário", "Telefone do Usuário", "Email do Usuário", "Empilhadeira"]}
                            />
                        </div>
                    )
            }
        </PageBase>
    )
}

export default VisitsAdminPage;