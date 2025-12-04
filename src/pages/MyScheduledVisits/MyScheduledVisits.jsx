import { useEffect, useState } from "react";
import PageBase from "../PageBase/PageBase";
import styles from "./MyScheduledVisits.module.css"
import BaseApi from "../../api/BaseApi";
import Table from "../../components/Table/Table";
import NotFound from "../../components/NotFound/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DateHelper from "../../helpers/DateHelper";
import CarrousselImagesModal from "../../components/CarrousselmagesModal/CarrousselImagesModal";

const MyScheduledVisits = () => {
    const [rentScheduledVisits, setRentScheduledVisits] = useState([]);
    const [mainentenceScheduleVisits, setMainentenceScheduleVisits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[imagesList, setImagesList] = useState([]);
    const[showAttachmentsModal, setShowAttachmentsModal] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        await loadScheduledVisits();
    };
    fetchData();
    setIsLoading(false);
    }, []);

    const viewHandler = (index) => {
        setImagesList(mainentenceScheduleVisits[index]?.base64Images);
        setShowAttachmentsModal(true);
    }

    const isViewEnabled = (index) => {
        return mainentenceScheduleVisits[index]?.base64Images !== null && mainentenceScheduleVisits[index]?.base64Images.length > 0;
    }

    const loadScheduledVisits = () => {  
       BaseApi.findScheduledVisitByType("AL").then((res) => {
       const data = res.data.map(visit => ({
        ...visit,
        forklift: `${visit.forklift.name} - ${visit.forklift.manufacturer} ${visit.forklift.model} - ${visit.forklift.fabricationYear}`,
        initialScheduledTime: DateHelper.datetimeToBrFormat(visit.initialScheduledTime),
        endScheduledTime: DateHelper.datetimeToBrFormat(visit.endScheduledTime)
       }));

       setRentScheduledVisits(data); 
       
    });
    
    BaseApi.findScheduledVisitByType("MA").then((res) => {
        const data = res.data.map(visit => ({
            ...visit,
            initialScheduledTime: DateHelper.datetimeToBrFormat(visit.initialScheduledTime),
            endScheduledTime: DateHelper.datetimeToBrFormat(visit.endScheduledTime)
        }))

        setMainentenceScheduleVisits(data);
    })

    }

    if(isLoading) return <LoadingSpinner/>

    

    return(
        
        <PageBase title="Meus Agendamentos">
            {
                rentScheduledVisits.length == 0 && mainentenceScheduleVisits.length == 0 ?
                    <NotFound title="Sem Resultados" text="Não foi encontrada nenhuma visita agendada para esta conta"/> :
                <div className={styles.content}>
                    
                        {
                            rentScheduledVisits.length > 0 ?
                            <div>
                                <h2 className={styles.subtitle}>Visitas De Aluguel Agendadas</h2>
                                <Table
                                    headers={["Descrição", "Data Inicial", "Data Final", "Empilhadeira"]}
                                    columns={["description", "initialScheduledTime", "endScheduledTime", "forklift"]}
                                    data={rentScheduledVisits}
                                /> 
                            </div>
                            : null
                        }

                    
                    
                        {
                            mainentenceScheduleVisits.length > 0 ?
                            <div>
                                <h2 className={styles.subtitle}>Visitas De Manutenção Agendadas</h2>
                                <Table
                                    headers={["Descrição", "Data Inicial", "Data Final"]}
                                    columns={["description", "initialScheduledTime", "endScheduledTime"]}
                                    data={mainentenceScheduleVisits}
                                    viewHandler={viewHandler}
                                    isViewEnabled={isViewEnabled}
                                /> 
                            </div>
                            : null
                        
                        }
                </div>
            }

            <CarrousselImagesModal
                ImagesList={imagesList}
                onRequestClose={() => setShowAttachmentsModal(false)}
                isOpen={showAttachmentsModal}
            />
        </PageBase>
    )
}

export default MyScheduledVisits;