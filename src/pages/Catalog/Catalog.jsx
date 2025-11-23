import styles from "./Catalog.module.css"
import { useState, useEffect } from "react";
import EmpilhadeiraCard from "../../components/EmpilhadeiraCard/EmpilhadeiraCard";
import BaseApi from "../../api/BaseApi";
import { FaSearch } from "react-icons/fa";
import PageBase from "../PageBase/PageBase";


function Catalog({setShowEmpilhadeiraModal, setSelectedEmpilhadeira}){
    
    const [empilhadeiras, setEmpilhadeiras] = useState([]);

    useEffect(() => {
        BaseApi.
        findAllEmpilhadeiras().
        then((res) => setEmpilhadeiras(res.data));
    }, [])

    const openModal = (dados) => {
        setSelectedEmpilhadeira(dados);
        setShowEmpilhadeiraModal(true);
    }

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
                    <div className={styles.notFoundWrapper}>
                        <FaSearch size={50}/>
                        <div className={styles.descriptionWrapper}>
                            <h2 className={styles.notFoundTitle}>Nenhum resultado encontrado!</h2>
                            <p className={styles.notFoundSubtitle}>Não foi encontrada nenhuma empilhadeira disponível no momento.</p>
                        </div>
                    </div>
            }
        </PageBase> 
                          
    )
}

export default Catalog;