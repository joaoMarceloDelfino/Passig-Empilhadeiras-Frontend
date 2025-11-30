import styles from "./Catalog.module.css"
import { useState, useEffect } from "react";
import EmpilhadeiraCard from "../../components/EmpilhadeiraCard/EmpilhadeiraCard";
import BaseApi from "../../api/BaseApi";
import PageBase from "../PageBase/PageBase";
import NotFound from "../../components/NotFound/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


function Catalog({setShowEmpilhadeiraModal, setSelectedEmpilhadeira}){
    
    const [empilhadeiras, setEmpilhadeiras] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        BaseApi.
        findAllEmpilhadeiras().
        then((res) => {setEmpilhadeiras(res.data); setIsLoading(false);});
    }, [])

    const openModal = (dados) => {
        setSelectedEmpilhadeira(dados);
        setShowEmpilhadeiraModal(true);
    }

    if(isLoading) return <LoadingSpinner/>
    
    return(
        
        <PageBase title="Catálogo">
            {
                empilhadeiras.length > 0 ?
                    <div className={styles.cardsWrapper}>
                        {
                            empilhadeiras.map(empilhadeira => (
                                <EmpilhadeiraCard 
                                    key={empilhadeira.id}
                                    openModalHandler={() => openModal(empilhadeira)}
                                    dados={empilhadeira}
                                />
                            )) 
                        }
                    </div> :
                    <NotFound 
                        title={"Nenhum resultado encontrado!"} 
                        text={"Não foi encontrada nenhuma empilhadeira disponível no momento."}
                    />

            }
        </PageBase> 
                          
    )
}

export default Catalog;